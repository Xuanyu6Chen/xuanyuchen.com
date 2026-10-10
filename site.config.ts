// Everything that decides what the site shows lives in this one file.

/** A piece of work on the Work page. */
export interface WorkItem {
  slug: string; // file name in content/work, without .md
  tile: 'text' | 'steps'; // text: a line of type on a dark card · steps: a row of labelled steps
  kicker?: string; // small line at the top of a text tile
  headline?: string; // large line of a text tile (defaults to the entry's description)
  steps?: string[]; // labels of a steps tile, in order
  current?: string; // the step drawn filled in
}

/** A topic on the Notes page. A note joins a topic through `series.id` in its front matter. */
export interface Topic {
  id: string;
  title: string;
  label?: string; // shown instead of the "3 notes" count
  subject?: string; // shown on its card; the heading the card sits under in "By topic"
  about?: string; // a line about the topic, shown first when its card is opened
  empty?: string; // line shown inside a topic that has no notes yet
}

export const site = {
  name: 'Xuanyu Chen',
  url: 'https://xuanyuchen.com',

  // One sentence for search results and link previews. Leave empty to have none.
  description: '',

  // Optional line under the name on Work and Notes. Leave empty to show the name alone.
  tagline: '',

  // Shown in the footer, in this order
  links: {
    GitHub: 'https://github.com/Xuanyu6Chen',
    LinkedIn: 'https://www.linkedin.com/in/xuanyu-chen-1046672aa/',
    Email: 'mailto:Xuanyu.chen3712@gmail.com',
  } as Record<string, string>,

  // Notes published before this day also answer at their old dated address
  // (/posts/2026-04-11-<file-name>/), so links shared before the rewrite keep working.
  datedAddressesBefore: '2026-10-09',
};

/** Work page: which entries appear, in this order, and how each tile is drawn. */
export const work: WorkItem[] = [
  {
    slug: 'clip-h',
    tile: 'text',
    kicker: 'Paper · GenAI4Health @ NeurIPS 2026',
    headline: 'Are LLM-Generated Hypotheses Trustworthy?',
  },
  {
    slug: 'ai-syllabus-analysis',
    tile: 'steps',
    steps: ['Collect', 'Convert', 'Extract', 'Dataset', 'Fine-tune', 'Analyze'],
    current: 'Fine-tune',
  },
];

/** Notes page: topics in display order. */
export const topics: Topic[] = [
  {
    id: 'money-and-banking',
    title: 'Money, Banking, and Financial Markets',
    subject: 'Economics',
    about: 'Learning from The Economics of Money, Banking, and Financial Markets, by Frederic S. Mishkin.',
    empty: 'Chapter notes will be listed here.',
  },
  { id: 'llm-fine-tuning', title: 'LLM fine-tuning', subject: 'AI' },
  { id: 'oil-markets', title: 'Oil markets', subject: 'Markets' },
  { id: 'linear-algebra', title: 'Linear algebra', subject: 'Math' },
  { id: 'regression', title: 'Regression', subject: 'Statistics' },
  { id: 'probability', title: 'Probability', subject: 'Statistics' },
  { id: 'statistical-theory', title: 'Statistical theory', subject: 'Statistics' },
];
