// What a note and a work entry must contain. Astro checks every file in content/ against this at build time.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // optional opening paragraph, shown above the list of notes in its topic; may use *italics* and ==highlight==
    intro: z.string().optional(),
    pubDate: z.coerce.date(),
    // the topic this note belongs to, and its place in that topic
    series: z.object({ id: z.string(), order: z.number() }).optional(),
    draft: z.boolean().default(false),
  }),
});

// The Chinese version of a note: content/notes/zh/<same file name>.md. Its date and topic come from the note.
const notesZh = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/notes/zh' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    intro: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/work' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    link: z.string().url().optional(),
    github: z.string().url().optional(),
    types: z.array(z.string()).default([]),
  }),
});

export const collections = { notes, notesZh, work };
