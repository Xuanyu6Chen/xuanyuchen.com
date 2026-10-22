// Reads the notes and work entries, and answers the questions pages ask about them (address, topic, dates).
import { getCollection, type CollectionEntry } from 'astro:content';
import { topics, work, type Topic, type WorkItem } from '../../site.config';

/** A line of front matter as HTML: escapes it, then turns ==text== into a highlight and *text* into italics. */
export function inlineHtml(text: string): string {
  const safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return safe.replace(/==(.+?)==/g, '<mark>$1</mark>').replace(/\*(.+?)\*/g, '<em>$1</em>');
}

/** The same line as plain text, for places that cannot show formatting (meta tags, search, the feed). */
export function plainText(text: string): string {
  return text.replace(/==(.+?)==/g, '$1').replace(/\*(.+?)\*/g, '$1');
}

export type Note = CollectionEntry<'notes'>;
export type Translation = CollectionEntry<'notesZh'>;
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

/** Chinese versions, by the file name of the note they translate. Drafts show only while developing. */
export async function getTranslations(): Promise<Map<string, Translation>> {
  const all = await getCollection('notesZh');
  const live = import.meta.env.DEV ? all : all.filter((zh) => !zh.data.draft);
  return new Map(live.map((zh) => [zh.id, zh]));
}

/** The Chinese version of a note lives one step under it: /posts/oil-basics/zh/ */
export const zhUrl = (note: Note) => `${noteUrl(note)}zh/`;

// 200 words a minute; Chinese has no spaces between words, so it is counted by character, 400 a minute
export function minutesToRead(text: { body?: string }): number {
  const body = text.body ?? '';
  const chinese = body.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  const words = body.replace(/[\u4e00-\u9fff]/g, ' ').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200 + chinese / 400));
}

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
