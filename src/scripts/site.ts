// Everything the site does after it loads: which animation a page change gets, things rising in
// as you scroll, the bar at the top, the two Notes switches, the light/dark button, search,
// and drawing a note's diagrams.
// Pages are swapped in place (see <ClientRouter /> in Page.astro), so this file runs once and
// listens on the document instead of on elements that get replaced.
import { navigate } from 'astro:transitions/client';

const root = document.documentElement;
const lessMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 1. Page changes.
   Astro runs every navigation as a view transition and writes its "direction" on <html>.
   Here the direction is set to what the navigation means, and site.css picks the animation:
     tab-fwd / tab-back  Work <-> Notes: the part under the name slides sideways
     open / close        a tile grows into its page, and shrinks back                       */
const tabOf = (path: string) => (path === '/' ? 'work' : /^\/posts\/?$/.test(path) ? 'notes' : '');
const workOf = (path: string) => path.match(/^\/projects\/([^/]+)\/?$/)?.[1] ?? '';
const markTile = (doc: Document, slug: string) =>
  doc.querySelector(`.tile[data-slug="${CSS.escape(slug)}"]`)?.setAttribute('data-vt', '');

let closing = '';

document.addEventListener('astro:before-preparation', (event) => {
  const from = event.from.pathname;
  const to = event.to.pathname;
  closing = '';
  if (tabOf(from) && tabOf(to) && tabOf(from) !== tabOf(to)) {
    event.direction = tabOf(to) === 'notes' ? 'tab-fwd' : 'tab-back';
  } else if (tabOf(from) === 'work' && workOf(to)) {
    event.direction = 'open';
    markTile(document, workOf(to)); // the tile that was clicked becomes the picture of the next page
  } else if (workOf(from) && tabOf(to) === 'work') {
    event.direction = 'close';
    closing = workOf(from);
  }
});

document.addEventListener('astro:before-swap', (event) => {
  if (!closing) return;
  // The page shrinks back into its tile, so that tile (and its neighbours) must already be visible.
  markTile(event.newDocument, closing);
  event.newDocument.querySelectorAll('[data-rv]').forEach((el) => el.classList.add('in'));
  event.viewTransition.finished.finally(() =>
    document.querySelectorAll('[data-vt]').forEach((el) => el.removeAttribute('data-vt'))
  );
});

/* 2. Things rise in as they enter the screen */
let observer: IntersectionObserver | undefined;

function reveal() {
  observer?.disconnect();
  const items = document.querySelectorAll<HTMLElement>('[data-rv]:not(.in)');
  if (lessMotion() || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        observer?.unobserve(el);
        // neighbours rise one after another, in the order they sit in the page
        const order = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
        el.classList.add('in');
        el.animate(
          [
            { opacity: 0, transform: 'translateY(26px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 900, delay: order * 90, easing: 'cubic-bezier(.2,.7,.1,1)', fill: 'backwards' }
        );
      }
    },
    { threshold: 0.1 }
  );
  items.forEach((el) => observer?.observe(el));
}

/* 3. While scrolling: the thin bar at the top fills, and on a note the "On this page" list
      marks the section being read */
let sections: { link: HTMLAnchorElement; heading: HTMLElement }[] = [];

function findSections() {
  sections = [...document.querySelectorAll<HTMLAnchorElement>('.toc a')].flatMap((link) => {
    const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    return heading ? [{ link, heading }] : [];
  });
}

function onScroll() {
  const bar = document.querySelector<HTMLElement>('.progress');
  const max = root.scrollHeight - window.innerHeight;
  if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;

  // the section being read is the last heading that has passed the top bar
  // (at the very bottom of the page it is the last section, which may be too short to get there)
  const atBottom = max > 0 && window.scrollY >= max - 2;
  const current = atBottom
    ? sections.at(-1)
    : sections.filter(({ heading }) => heading.getBoundingClientRect().top <= 120).pop();
  for (const section of sections) section.link.classList.toggle('on', section === current);
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);

/* 4. Notes: click a topic and its list unfolds */
document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest('.topic-h');
  if (!button?.parentElement) return;
  const open = button.parentElement.classList.toggle('open');
  button.setAttribute('aria-expanded', String(open));
  button.parentElement.querySelector('.fold')?.toggleAttribute('inert', !open);
});

/* 5. Notes: arranged by card, by topic or by date. <html data-nv> says which; site.css shows
      that one. In the code the three are 'topic' (by card), 'subject' (by topic) and 'date'. */
const arrangements = ['topic', 'subject', 'date'];
const showArrangement = () =>
  document
    .querySelectorAll<HTMLElement>('.seg-b')
    .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.nv === (root.dataset.nv ?? 'topic'))));

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest<HTMLElement>('.seg-b');
  if (!button) return;
  const view = arrangements.includes(button.dataset.nv ?? '') ? button.dataset.nv! : 'topic';
  const from = root.dataset.nv ?? 'topic';
  if (from === view) return;

  const apply = () => {
    root.dataset.nv = view;
    showArrangement();
    try {
      localStorage.setItem('notes-view', view);
    } catch {
      /* storage can be blocked; the choice then lasts for this page only */
    }
    reveal();
  };
  if (!document.startViewTransition || lessMotion()) return apply();

  // slide the notes sideways, the same move as switching between Work and Notes
  root.dataset.nvAnim = arrangements.indexOf(view) > arrangements.indexOf(from) ? 'fwd' : 'back';
  const transition = document.startViewTransition(apply);
  transition.ready.catch(() => {}); // an interrupted animation is fine: the change still applies
  transition.finished.finally(() => delete root.dataset.nvAnim);
});

/* 6. Light / dark. The choice is saved; Page.astro reads it back before each page paints. */
document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element) || !event.target.closest('[data-toggle-theme]')) return;
  const dark = root.classList.toggle('dark');
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  } catch {
    /* storage can be blocked; the choice then lasts for this page only */
  }
  drawDiagrams();
});

/* 7. Search. Opens from the magnifier or with Cmd/Ctrl + K. The list of everything on the site
      is fetched once, the first time search opens (src/pages/search.json.ts builds it). */
interface Entry {
  title: string;
  text: string;
  url: string;
  kind: string;
}

let everything: Promise<Entry[]> | undefined;
const loadEverything = () =>
  (everything ??= fetch('/search.json')
    .then((response) => response.json() as Promise<Entry[]>)
    .catch(() => {
      everything = undefined; // try again next time
      return [];
    }));

const searchBox = () => document.querySelector<HTMLDialogElement>('dialog.search');
const results = (box: HTMLDialogElement) => [...box.querySelectorAll<HTMLAnchorElement>('.search-list a')];

async function showResults(box: HTMLDialogElement, typed: string) {
  const input = box.querySelector('input');
  const list = box.querySelector('.search-list');
  const nothing = box.querySelector<HTMLElement>('.search-empty');
  if (!input || !list || !nothing) return;

  const all = await loadEverything();
  if (input.value !== typed) return; // more was typed while the list was loading

  // every word typed has to appear somewhere; a match in the title ranks first
  const words = typed.toLowerCase().split(/\s+/).filter(Boolean);
  const inTitle = (entry: Entry) => words.filter((word) => entry.title.toLowerCase().includes(word)).length;
  const found = all
    .filter((entry) => {
      const text = `${entry.title} ${entry.text} ${entry.kind}`.toLowerCase();
      return words.every((word) => text.includes(word));
    })
    .sort((a, b) => inTitle(b) - inTitle(a))
    .slice(0, 8);

  list.replaceChildren(
    ...found.map((entry, i) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      const title = document.createElement('b');
      const kind = document.createElement('span');
      const text = document.createElement('small');
      link.href = entry.url;
      link.classList.toggle('on', i === 0);
      title.textContent = entry.title;
      kind.className = 'type';
      kind.textContent = entry.kind;
      text.textContent = entry.text;
      link.append(title, kind, text);
      item.append(link);
      return item;
    })
  );
  nothing.hidden = found.length > 0;
}

function openSearch() {
  const box = searchBox();
  const input = box?.querySelector('input');
  if (!box || !input || box.open) return;
  input.value = '';
  box.showModal();
  showResults(box, '');
}

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;
  const box = searchBox();
  if (event.target.closest('[data-open-search]')) openSearch();
  // a click on the dimmed area around the box, or on a result, closes it
  else if (box?.open && (event.target === box || event.target.closest('.search-list a'))) box.close();
});

document.addEventListener('input', (event) => {
  const box = searchBox();
  if (box && event.target instanceof HTMLInputElement && box.contains(event.target)) {
    showResults(box, event.target.value);
  }
});

document.addEventListener('keydown', (event) => {
  const box = searchBox();
  if (!box) return;
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    if (box.open) box.close();
    else openSearch();
    return;
  }
  if (!box.open) return;

  // arrow keys move the highlight; Enter in the box opens the highlighted result
  const links = results(box);
  const at = links.findIndex((link) => link.classList.contains('on'));
  if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && links.length > 0) {
    event.preventDefault();
    const next = (at + (event.key === 'ArrowDown' ? 1 : links.length - 1)) % links.length;
    links[at]?.classList.remove('on');
    links[next].classList.add('on');
    links[next].scrollIntoView({ block: 'nearest' });
  } else if (event.key === 'Enter' && event.target instanceof HTMLInputElement && links[at]) {
    event.preventDefault();
    box.close();
    navigate(links[at].pathname);
  }
});

/* 8. Diagrams. A ```mermaid block in a note arrives as text and is drawn here, in the site's
      own black and white. The drawing library is fetched only on a page that has a diagram,
      and the diagrams are drawn again when light / dark changes. */
let drawn = 0; // every drawing gets its own id, so a redraw never collides with the one it replaces

async function drawDiagrams() {
  const blocks = [...document.querySelectorAll<HTMLElement>('pre.mermaid, .diagram')];
  if (!blocks.length) return;
  const { default: mermaid } = await import('mermaid');
  const colour = (name: string) => getComputedStyle(root).getPropertyValue(name).trim();
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    flowchart: { wrappingWidth: 260 }, // a box keeps a label of a few words on one line
    themeVariables: {
      darkMode: root.classList.contains('dark'),
      fontFamily: colour('--sans'),
      fontSize: '15px',
      background: colour('--bg'),
      primaryColor: colour('--card'),
      primaryTextColor: colour('--fg'),
      primaryBorderColor: colour('--dot'),
      secondaryColor: colour('--card'),
      tertiaryColor: colour('--bg'),
      lineColor: colour('--muted'),
      textColor: colour('--fg'),
    },
  });
  for (const block of blocks) {
    const source = block.dataset.source ?? block.textContent ?? '';
    try {
      const { svg } = await mermaid.render(`diagram-${++drawn}`, source);
      const figure = document.createElement('div');
      figure.className = 'diagram';
      figure.dataset.source = source;
      figure.innerHTML = svg;
      block.replaceWith(figure);
      linkDetails(figure);
    } catch {
      block.classList.add('failed'); // a diagram that cannot be drawn stays readable as text
    }
  }
}

/* 9. A diagram as a map. A box whose label is the title of a folded callout in the same note
      becomes a button: clicking it opens that callout as a card under the box, and the diagram
      makes room for it: every box and arrow below moves down by the card's height, and the
      arrows that cross the gap stretch. Any number of cards can be open at once. Clicking the
      box again (or the card's title) closes it. Without scripts the callouts stay in the page
      below the diagram, folded. */
const GAP = 10; // space between a box and its card, and between the card and what follows
let refit = () => {}; // lays the open cards out again (the window changed width)

function linkDetails(figure: HTMLElement) {
  const prose = figure.closest<HTMLElement>('.prose');
  const svg = figure.querySelector<SVGSVGElement>('svg');
  if (!prose || !svg) return;
  const details = new Map<string, HTMLDetailsElement>();
  for (const detail of prose.querySelectorAll<HTMLDetailsElement>('details.callout')) {
    const title = detail.querySelector('summary')?.textContent?.trim().toLowerCase();
    if (title) details.set(title, detail);
  }
  // The diagram as it was drawn: where every box sits and the points of every arrow
  const view = svg.getAttribute('viewBox') ?? '';
  const [x, y, width, height] = view.split(/[\s,]+/).map(Number);
  const moved = [...svg.querySelectorAll<SVGGElement>('g.node, g.edgeLabel, g.cluster')];
  const arrows = [...svg.querySelectorAll<SVGPathElement>('.edgePaths path, path.flowchart-link')];
  const places = moved.map((part) => part.getAttribute('transform') ?? '');
  const lines = arrows.map((arrow) => arrow.getAttribute('d') ?? '');
  const linked: { node: SVGGElement; detail: HTMLDetailsElement }[] = [];

  // Draws the diagram for the cards that are open now
  const layout = () => {
    moved.forEach((part, i) => part.setAttribute('transform', places[i]));
    arrows.forEach((arrow, i) => arrow.setAttribute('d', lines[i]));
    svg.setAttribute('viewBox', view);
    const frame = svg.getBoundingClientRect();
    const top = prose.getBoundingClientRect().top;
    const scale = frame.width / width; // screen pixels per diagram unit
    // each open card: the line it opens under (the bottom of its box) and the room it needs
    const open = linked
      .filter(({ detail }) => detail.classList.contains('shown'))
      .map(({ node, detail }) => {
        const box = node.getBoundingClientRect();
        return { detail, edge: box.bottom, left: box.left, room: detail.offsetHeight + 2 * GAP };
      })
      .sort((a, b) => a.edge - b.edge || a.left - b.left);
    for (const { node, detail } of linked) {
      node.classList.toggle('current', detail.classList.contains('shown'));
    }
    const roomAbove = (line: number) =>
      open.reduce((sum, card) => (card.edge < line ? sum + card.room : sum), 0);
    const shifts = moved.map((part) => {
      const box = part.getBoundingClientRect();
      return roomAbove(box.top + box.height / 2);
    });
    moved.forEach((part, i) => {
      if (shifts[i]) part.setAttribute('transform', `translate(0,${shifts[i] / scale}) ${places[i]}`);
    });
    // an arrow is a list of x,y points: each point moves down with the boxes at its height
    arrows.forEach((arrow, i) => {
      const stretched = lines[i].replace(/(-?[\d.]+)[ ,](-?[\d.]+)/g, (point, px, py) => {
        const shift = roomAbove(frame.top + (Number(py) - y) * scale - 0.5);
        return shift ? `${px},${Number(py) + shift / scale}` : point;
      });
      arrow.setAttribute('d', stretched);
    });
    // cards go in order down the page; two boxes on one row stack their cards
    let used = 0;
    for (const card of open) {
      card.detail.style.top = `${card.edge - top + used + GAP}px`;
      used += card.room;
    }
    svg.setAttribute('viewBox', `${x} ${y} ${width} ${height + used / scale}`);
  };

  for (const node of svg.querySelectorAll<SVGGElement>('g.node')) {
    const detail = details.get(node.textContent?.trim().toLowerCase() ?? '');
    if (!detail) continue;
    linked.push({ node, detail });
    const toggle = () => {
      detail.open = detail.classList.toggle('shown');
      layout();
    };
    node.classList.add('has-detail');
    node.setAttribute('role', 'button');
    node.setAttribute('tabindex', '0');
    node.addEventListener('click', toggle);
    node.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      toggle();
    });
    detail.classList.add('map-detail');
    // closing a card by its own title closes its gap too
    detail.ontoggle = () => {
      if (detail.open || !detail.classList.contains('shown')) return;
      detail.classList.remove('shown');
      layout();
    };
  }
  refit = layout;
  layout(); // a redraw (light / dark) starts from a fresh drawing: open cards go back in
}

window.addEventListener('resize', () => refit());

// Runs on the first load and after every page change
document.addEventListener('astro:page-load', () => {
  drawDiagrams();
  reveal();
  findSections();
  onScroll();
  showArrangement();
});
