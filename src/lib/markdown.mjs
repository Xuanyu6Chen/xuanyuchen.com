// Touch-ups applied to every note as it is turned into a page.
// 1. moneyNotMath: a dollar sign that is a price stays a price once math is switched on.
// 2. obsidian: the Obsidian syntax a note may carry: callouts, ==highlights== and [[links]].
// 3. tidyLinksAndImages: links to other sites open in a new tab, images load when about to be seen.

import fs from 'node:fs';
import path from 'node:path';

/* ---------- 1. Prices are not formulas ---------- */

// Obsidian's rule for $...$: the opening $ is followed by a character that is not a space, the
// closing $ follows one that is not a space and is not followed by a digit. "$73 to $87" fails
// it, so both signs are escaped before the note is parsed. Code is left alone.
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
      out += '$$';
      i++;
      continue;
    }
    let close = -1;
    if (/\S/.test(text[i + 1] ?? ' ')) {
      for (let j = i + 2; j < text.length; j++) {
        if (text[j] === '\\') j++;
        else if (text[j] === '$' && /\S/.test(text[j - 1]) && !/[\d$]/.test(text[j + 1] ?? '')) {
          close = j;
          break;
        }
      }
    }
    if (close < 0) out += '\\$';
    else {
      out += text.slice(i, close + 1);
      i = close;
    }
  }
  return out;
}

function escapeMoney(doc) {
  let fence = null;
  return doc
    .split('\n')
    .map((line) => {
      const mark = line.match(/^\s*(?:>\s*)*(`{3,}|~{3,})/)?.[1];
      if (fence) {
        if (mark && mark[0] === fence[0] && mark.length >= fence.length) fence = null;
        return line;
      }
      if (mark) {
        fence = mark;
        return line;
      }
      // odd pieces are `inline code`
      return line
        .split(/(`+[^`]*`+)/)
        .map((piece, i) => (i % 2 ? piece : escapeLoneDollars(piece)))
        .join('');
    })
    .join('\n');
}

export function moneyNotMath() {
  const parse = this.parser;
  this.parser = (doc, file) => parse(escapeMoney(String(doc)), file);
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
  const m = lead?.type === 'text' ? lead.value.match(/^\[!([\w-]+)\]([+-]?)[ \t]*([^\n]*)\n?/) : null;
  if (!m) return;
  const [whole, kind, fold, title] = m;

  lead.value = lead.value.slice(whole.length);
  if (!lead.value) first.children.shift();
  const body = quote.children.filter((child) => child !== first || first.children.length);
  const heading = [text(title.trim() || kind[0].toUpperCase() + kind.slice(1).replace(/-/g, ' '))];

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
