// Touch-ups applied to every note as it is turned into a page.
// 1. obsidianMath: math as Obsidian reads it, and a dollar sign that is a price stays a price.
//    lineBreaks: a new line inside a paragraph is a new line on the page, as in Obsidian.
//    mermaidBlocks: a ```mermaid block is handed to the browser to draw as a diagram.
// 2. obsidian: the Obsidian syntax a note may carry: callouts, ==highlights== and [[links]].
// 3. tidyLinksAndImages: links to other sites open in a new tab, images load when about to be seen.

import fs from 'node:fs';
import path from 'node:path';

/* ---------- 1. Math the way Obsidian reads it ---------- */

// The parser's own rules for $ differ from Obsidian's in three places, so the note's text is
// adjusted before it is parsed. Code is left alone.
// - Obsidian's rule for $...$: the opening $ is followed by a character that is not a space, the
//   closing $ follows one that is not a space and is not followed by a digit. "$73 to $87" fails
//   it, so both signs are escaped and stay prices.
// - A formula that holds a \$ ("$P = \$900$") is fenced with $$ so the inner sign cannot end it.
// - A formula written as $$...$$ on one line is put on lines of its own, which is what makes it
//   a centred formula instead of one inside the sentence.
function escapeLoneDollars(text) {
  let out = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '\\') {
      out += ch + (text[i + 1] ?? '');
      i++;
      continue;
    }
    if (ch !== '$') {
      out += ch;
      continue;
    }
    if (text[i + 1] === '$') {
      // $$...$$ inside a line passes through untouched
      const end = text.indexOf('$$', i + 2);
      const stop = end < 0 ? i + 1 : end + 1;
      out += text.slice(i, stop + 1);
      i = stop;
      continue;
    }
    let close = -1;
    if (/\S/.test(text[i + 1] ?? ' ')) {
      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === '\\') j++;
        else if (j > i + 1 && text[j] === '$' && /\S/.test(text[j - 1]) && !/[\d$]/.test(text[j + 1] ?? '')) {
          close = j;
          break;
        }
      }
    }
    if (close < 0) out += '\\$';
    else {
      const formula = text.slice(i, close + 1);
      out += formula.slice(1, -1).includes('$') ? `$${formula}$` : formula;
      i = close;
    }
  }
  return out;
}

function asObsidianReadsMath(doc) {
  let fence = null; // inside a code block, or a formula already on lines of its own
  return doc
    .split('\n')
    .map((line) => {
      const mark = line.match(/^\s*(?:>\s*)*(`{3,}|~{3,}|\$\$\s*$)/)?.[1].trim();
      if (fence) {
        if (mark && mark[0] === fence[0] && mark.length >= fence.length) fence = null;
        return line;
      }
      if (mark) {
        fence = mark;
        return line;
      }
      const whole = line.match(/^(\s*(?:>\s*)*)\$\$(.+)\$\$\s*$/);
      if (whole && !whole[2].includes('$$')) return `${whole[1]}$$\n${whole[1]}${whole[2]}\n${whole[1]}$$`;
      // odd pieces are `inline code`
      return line
        .split(/(`+[^`]*`+)/)
        .map((piece, i) => (i % 2 ? piece : escapeLoneDollars(piece)))
        .join('');
    })
    .join('\n');
}

export function obsidianMath() {
  const parse = this.parser;
  this.parser = (doc, file) => parse(asObsidianReadsMath(String(doc)), file);
}

export function lineBreaks() {
  const visit = (node) => {
    if (!node.children) return;
    node.children = node.children.flatMap((child) =>
      child.type === 'text' && child.value.includes('\n')
        ? child.value.split(/\n/).flatMap((line, i) => (i ? [{ type: 'break' }, { type: 'text', value: line }] : [{ type: 'text', value: line }]))
        : [child],
    );
    node.children.forEach(visit);
  };
  return (tree) => visit(tree);
}

// A ```mermaid block is kept as plain text instead of being coloured as code;
// src/scripts/site.ts draws it once the page is open.
export function mermaidBlocks() {
  const escaped = (source) => source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const visit = (node) => {
    (node.children ?? []).forEach((child, i) => {
      if (child.type === 'code' && child.lang === 'mermaid') {
        node.children[i] = { type: 'html', value: `<pre class="mermaid">${escaped(child.value)}</pre>` };
      } else visit(child);
    });
  };
  return (tree) => visit(tree);
}

/* ---------- 2. Obsidian syntax ---------- */

const text = (value) => ({ type: 'text', value });
const el = (tagName, properties, children) => ({ type: 'element', tagName, properties, children });

// The same ids Astro gives headings, for [[Note#Heading]]
const headingId = (heading) =>
  heading
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s/g, '-');

// Every published note, by its file name
function publishedNotes(dir) {
  const notes = new Map();
  const field = (front, name) =>
    front.match(new RegExp(`^${name}:\\s*(.+?)\\s*$`, 'm'))?.[1].replace(/^(['"])(.*)\1$/, '$2');
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    const front = fs.readFileSync(path.join(dir, file), 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    if (field(front, 'draft') === 'true' || new Date(field(front, 'pubDate')) > new Date()) continue;
    const slug = file.slice(0, -3);
    notes.set(slug.toLowerCase(), `/posts/${slug}/`);
  }
  return notes;
}

// [[Note]], [[Note|shown text]], [[Note#Heading]], [[#Heading]].
// A link to a note that is not on the site becomes plain text.
function wikilinks(value, notes) {
  const out = [];
  let last = 0;
  for (const m of value.matchAll(/(!?)\[\[([^[\]|#]*)(?:#([^[\]|]*))?(?:\|([^[\]]*))?\]\]/g)) {
    if (m[1]) continue; // ![[...]] is a picture or an embed, not a link
    const [whole, , target, heading, shown] = m;
    const name = target.split('/').pop().replace(/\.md$/, '').trim();
    const label = shown ?? (name || heading);
    const page = name ? notes.get(name.toLowerCase()) : '';
    out.push(text(value.slice(last, m.index)));
    out.push(
      page === undefined
        ? text(label)
        : el('a', { href: page + (heading ? `#${headingId(heading)}` : '') }, [text(label)]),
    );
    last = m.index + whole.length;
  }
  if (!out.length) return [text(value)];
  out.push(text(value.slice(last)));
  return out.filter((node) => node.type !== 'text' || node.value);
}

// ==text== becomes <mark>, also around bold, italics or a link. A pair counts when the opening
// == touches the text after it and the closing == touches the text before it.
function highlights(children) {
  const marks = []; // [child index, offset, opens?]
  let open = false;
  children.forEach((child, c) => {
    if (child.type !== 'text') return;
    for (let at = child.value.indexOf('=='); at >= 0; at = child.value.indexOf('==', at + 2)) {
      const before = at > 0 ? child.value[at - 1] : c > 0 ? 'x' : ' ';
      const after = at + 2 < child.value.length ? child.value[at + 2] : c < children.length - 1 ? 'x' : ' ';
      if (after === '=' || before === '=') continue;
      if (!open && /\S/.test(after)) marks.push([c, at, (open = true)]);
      else if (open && /\S/.test(before)) marks.push([c, at, (open = false)]);
    }
  });
  if (open) marks.pop();
  if (!marks.length) return children;

  const out = [];
  let mark = null;
  const add = (node) => (mark ? mark.children : out).push(node);
  children.forEach((child, c) => {
    const here = marks.filter(([index]) => index === c);
    if (!here.length) return add(child);
    let last = 0;
    for (const [, at, opens] of here) {
      if (at > last) add(text(child.value.slice(last, at)));
      if (opens) out.push((mark = el('mark', {}, [])));
      else mark = null;
      last = at + 2;
    }
    if (last < child.value.length) add(text(child.value.slice(last)));
  });
  return out;
}

// > [!note] Title          a card with its title on top; the kind alone ("Note") when no title
// > [!tip]- Title          the same, folded shut until it is clicked ("+" starts it open)
function callout(quote) {
  const first = quote.children.find((child) => child.type === 'element');
  const lead = first?.tagName === 'p' ? first.children[0] : undefined;
  const m = lead?.type === 'text' ? lead.value.match(/^\[!([\w-]+)\]([+-]?)[ \t]*/) : null;
  if (!m) return;
  const [whole, kind, fold] = m;

  // the title is the rest of the first line, formulas and bold included
  lead.value = lead.value.slice(whole.length);
  const end = first.children.findIndex(
    (child) => child.tagName === 'br' || (child.type === 'text' && child.value.includes('\n')),
  );
  const heading = first.children.splice(0, end < 0 ? first.children.length : end);
  const cut = first.children[0];
  if (cut?.tagName === 'br') first.children.shift();
  else if (cut) {
    const at = cut.value.indexOf('\n');
    if (cut.value.slice(0, at)) heading.push(text(cut.value.slice(0, at)));
    cut.value = cut.value.slice(at + 1);
  }
  while (first.children[0]?.type === 'text' && !first.children[0].value.trim()) first.children.shift();
  if (!heading.some((node) => node.type !== 'text' || node.value.trim())) {
    heading.splice(0, heading.length, text(kind[0].toUpperCase() + kind.slice(1).replace(/-/g, ' ')));
  }
  const body = quote.children.filter((child) => child !== first || first.children.length);

  quote.properties = { className: ['callout'], dataCallout: kind.toLowerCase() };
  if (fold) {
    quote.tagName = 'details';
    if (fold === '+') quote.properties.open = true;
    quote.children = [el('summary', { className: ['callout-title'] }, heading), ...body];
  } else {
    quote.tagName = 'aside';
    quote.children = [el('p', { className: ['callout-title'] }, heading), ...body];
  }
}

export function obsidian({ notesDir = 'content/notes' } = {}) {
  const visit = (node, notes) => {
    if (node.type === 'element') {
      if (node.tagName === 'code' || node.tagName === 'pre') return;
      if (node.tagName === 'blockquote') callout(node);
    }
    if (!node.children) return;
    node.children = node.children.flatMap((child) =>
      child.type === 'text' && child.value.includes('[[') ? wikilinks(child.value, notes) : [child],
    );
    node.children = highlights(node.children);
    node.children.forEach((child) => visit(child, notes));
  };
  return (tree) => visit(tree, publishedNotes(notesDir));
}

/* ---------- 3. Links and images ---------- */

export function tidyLinksAndImages({ home = '' } = {}) {
  const visit = (node) => {
    if (node.type === 'element') {
      const props = node.properties ?? (node.properties = {});
      if (node.tagName === 'a') {
        const href = String(props.href ?? '');
        if (/^https?:\/\//.test(href) && !(home && href.startsWith(home))) {
          props.target = '_blank';
          props.rel = 'noopener noreferrer';
        }
      }
      if (node.tagName === 'img') {
        props.loading = 'lazy';
        props.decoding = 'async';
      }
    }
    (node.children ?? []).forEach(visit);
  };
  return (tree) => visit(tree);
}
