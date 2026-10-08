// Reads the notes and work entries, and answers the questions pages ask about them (address, topic, dates).
import { getCollection, type CollectionEntry } from 'astro:content';
import { topics, work, type Topic, type WorkItem } from '../../site.config';

export type Note = CollectionEntry<'notes'>;
export type WorkEntry = CollectionEntry<'work'>;

/* ---------- Notes ---------- */

/** Live notes, newest first. Drafts and future-dated notes show only while developing. */
export async function getNotes(): Promise<Note[]> {
  const all = await getCollection('notes');
  const live = import.meta.env.DEV
    ? all
    : all.filter((note) => !note.data.draft && note.data.pubDate <= new Date());
  return live.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** A note's address is its file name: content/notes/oil-basics.md is /posts/oil-basics/ */
export const noteUrl = (note: Note) => `/posts/${note.id}/`;

/** The address a note had before the rewrite: its date, then its file name. */
export const datedName = (note: Note) => `${note.data.pubDate.toISOString().slice(0, 10)}-${note.id}`;

export const topicOf = (note: Note): Topic | undefined =>
  topics.find((topic) => topic.id === note.data.series?.id);

/** The notes of one topic, in reading order. */
export const notesIn = (topicId: string, notes: Note[]) =>
  notes
    .filter((note) => note.data.series?.id === topicId)
    .sort((a, b) => (a.data.series?.order ?? 0) - (b.data.series?.order ?? 0));

export const minutesToRead = (note: Note) =>
  Math.max(1, Math.round((note.body ?? '').split(/\s+/).length / 200));

// Dates in notes are calendar dates, so they are shown the same on every machine
const dayMonth = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
const dayMonthYear = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});
export const shortDate = (date: Date) => dayMonth.format(date);
export const longDate = (date: Date) => dayMonthYear.format(date);

/* ---------- Work ---------- */

export interface Piece {
  item: WorkItem; // how its tile is drawn (site.config.ts)
  entry: WorkEntry; // its page (content/work)
}

/** The Work page: the entries named in site.config.ts, in that order. */
export async function getWork(): Promise<Piece[]> {
  const entries = await getCollection('work');
  return work.flatMap((item) => {
    const entry = entries.find((e) => e.id === item.slug);
    return entry ? [{ item, entry }] : [];
  });
}

export const workUrl = (entry: WorkEntry) => `/projects/${entry.id}/`;

/** 'open-source' -> 'Open source' */
export function kindOf(entry: WorkEntry): string {
  const kind = entry.data.types[0];
  if (!kind) return '';
  const words = kind.replace('-', ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}
