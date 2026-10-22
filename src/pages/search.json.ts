// The list the search box looks through: every note and piece of work, built once with the site.
import { getNotes, getWork, noteUrl, plainText, topicOf, workUrl } from '../lib/content';

export async function GET() {
  const pieces = await getWork();
  const notes = await getNotes();

  const entries = [
    ...pieces.map(({ entry }) => ({
      title: entry.data.title,
      text: plainText(entry.data.description),
      url: workUrl(entry),
      kind: 'Work',
    })),
    ...notes.map((note) => ({
      title: note.data.title,
      text: plainText(note.data.description),
      url: noteUrl(note),
      kind: topicOf(note)?.title ?? 'Note',
    })),
  ];

  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json' },
  });
}
