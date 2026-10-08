// The feed: lets a reader app follow new notes.
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../../site.config';
import { getNotes, noteUrl } from '../lib/content';

export async function GET(context: APIContext) {
  const notes = await getNotes();
  return rss({
    title: site.name,
    description: site.description || `Notes by ${site.name}`,
    site: context.site ?? site.url,
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.description,
      pubDate: note.data.pubDate,
      link: noteUrl(note),
    })),
  });
}
