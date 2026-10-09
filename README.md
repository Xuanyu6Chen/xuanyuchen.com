# xuanyuchen.com

The source of [xuanyuchen.com](https://xuanyuchen.com): Xuanyu Chen's work and notes.

The site has two tabs. **Work** is a gallery; each tile opens into its own page. **Notes** lists
the same notes two ways, by topic or by date. It is built with [Astro](https://astro.build) into
plain files (HTML, CSS, a little JavaScript) and served by GitHub Pages.

## Run it

Needs [Node.js](https://nodejs.org) 22 or newer.

```bash
npm install        # once, and again whenever package.json changes
npm run dev        # the site at http://localhost:4321, updating as files are saved
npm run build      # writes the finished site to dist/
npm run preview    # serves dist/, to check the build before it is published
```

## Where things live

```
site.config.ts         what the site shows: name, footer links, Work tiles, Notes topics
content/
  notes/               one Markdown file per note
  work/                one Markdown file per piece of work
public/                served as is: images, icon, link-preview picture, robots.txt
src/
  content.config.ts    what a note and a work entry must contain
  lib/content.ts       reads content/ and answers questions about it (address, topic, dates)
  lib/markdown.mjs     touch-ups applied to every note as it is built
  layouts/Page.astro   the frame around every page: top bar, name, the page, footer
  components/          TopBar, Name, WorkPicture, Search, Forward
  pages/               one file per address (table below)
  styles/site.css      the whole look
  scripts/site.ts      everything that happens in the browser
astro.config.ts        build settings
.github/workflows/     deploy.yml publishes the site
```

| Address | Built by |
|---|---|
| `/` | `src/pages/index.astro` (Work) |
| `/projects/<name>/` | `src/pages/projects/[slug].astro` (one piece of work) |
| `/posts/` | `src/pages/posts/index.astro` (Notes) |
| `/posts/<name>/` | `src/pages/posts/[slug].astro` (one note) |
| `/rss.xml`, `/search.json` | `src/pages/rss.xml.ts`, `src/pages/search.json.ts` |
| anything else | `src/pages/404.astro` |

Old addresses still answer and forward to the current one: the dated note addresses used before
October 2026 (`/posts/2026-03-21-<name>/`), `/projects/` and `/about/`.

## How it fits together

1. **Content in, pages out.** `src/content.config.ts` says what a note and a work entry must
   contain, and the build stops if a file breaks that. `src/lib/content.ts` loads them, and each
   page asks it for what it shows.
2. **One frame.** Every page is wrapped in `Page.astro`. The large name sits outside
   `<main id="views">`, so when the tab changes only the part under the name moves.
3. **Page changes are animated by the browser** (View Transitions, through Astro's
   `<ClientRouter />`). `src/scripts/site.ts` labels each navigation with what it means, and
   `src/styles/site.css` picks the animation for that label:

   | Label | When | What moves |
   |---|---|---|
   | `tab-fwd` / `tab-back` | Work ↔ Notes | the part under the name slides sideways |
   | `open` / `close` | a tile ↔ its page | the tile's picture grows into the page, and shrinks back |
   | none | every other page change | the next page fades up |

   Visitors who ask their system for reduced motion get none of it.
4. **Two choices are remembered in the browser** (`localStorage`): light or dark (`theme`) and
   how Notes is arranged (`notes-view`). A small inline script in `Page.astro` reads them before
   the page paints, so nothing flashes. With no saved theme, the visitor's system setting decides.
5. **Search** reads `/search.json`, a list of every title and description that is built with
   the site. Nothing typed into it leaves the browser.

## Add a note

1. Create `content/notes/<file-name>.md`. The file name becomes the address:
   `oil-markets-3-refining.md` is `/posts/oil-markets-3-refining/`.

   ```yaml
   ---
   title: 'Oil Markets (3): Refining'
   description: One sentence. Shown under the title, in search and in the feed.
   pubDate: 2026-11-02
   series:            # optional: the topic this note belongs to
     id: oil-markets  #   a topic id from site.config.ts
     order: 3         #   its place in that topic
   draft: false       # true keeps it off the published site
   ---
   ```

2. Pictures go in `public/images/<topic>/` and are written as
   `![What it shows](/images/<topic>/file.png)`. A line of italics directly under a picture
   becomes its caption.
3. A new topic is one line in `topics` in `site.config.ts`. A note whose topic is not listed
   there shows under "Other notes".

4. Beyond standard Markdown, a note may use what Obsidian writes (`src/lib/markdown.mjs`):

   | Written | Becomes |
   |---|---|
   | `$x^2$` and `$$ ... $$` | a formula (LaTeX, drawn at build time by MathJax); `$$ ... $$` on a line of its own is centred. A price such as `$73` stays a price |
   | a new line inside a paragraph | a new line on the page, as in Obsidian |
   | `==text==` | highlighted text |
   | `> [!note] Title` | a callout card; `[!note]-` starts folded |
   | `[[Note]]`, `[[Note\|shown text]]`, `[[Note#Heading]]` | a link to that note if it is published, plain text if not. `Note` is the site file name |

A note with `draft: true`, or a `pubDate` in the future, appears in `npm run dev` only.

## Add a piece of work

1. Create `content/work/<name>.md`. Anything written under the front matter becomes the body
   of its page.

   ```yaml
   ---
   title: Name of the work
   description: One sentence. Shown on its page and in search.
   types: [research]                # the small label next to its name
   github: https://github.com/...   # optional
   link: https://...                # optional
   ---
   ```

2. Add it to `work` in `site.config.ts`, which also says how its tile is drawn (a line of type,
   or a row of labelled steps). **Only entries listed there are published.** A file in
   `content/work/` that is not listed is left out of the build.

## Publishing

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes
`dist/` to GitHub Pages. It takes a minute or two. In the repository this needs
**Settings → Pages → Source: GitHub Actions**, and the custom domain is set on that same page
(`public/CNAME` only records it).

## Notes on the setup

- `npm install` also runs the `prepare` script in `package.json`. On a Mac it tells iCloud Drive
  to leave `node_modules/`, `dist/`, `.astro/` and `.git/` alone. The first three are
  regenerable and the fourth is backed up on GitHub; iCloud fills all of them with duplicate
  files otherwise. Anywhere else the script does nothing. `npm run prepare` runs it on its own.
- The fonts (Inter, JetBrains Mono) are installed as packages and served from the site itself.
  The site sets no cookies and loads nothing from other servers.

## Rights

© Xuanyu Chen. All rights reserved. The code and the writing in this repository are published
to be read, not reused; no license is offered.
