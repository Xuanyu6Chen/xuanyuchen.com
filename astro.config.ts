// Build settings. What the site shows is decided in site.config.ts, not here.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './site.config';
import { tidyLinksAndImages } from './src/lib/markdown.mjs';

export default defineConfig({
  site: site.url,

  integrations: [
    // The sitemap lists real pages only, not the old addresses that forward to them
    sitemap({
      filter: (page) => !/\/posts\/\d{4}-\d{2}-\d{2}-|\/projects\/$|\/about\/$/.test(page),
    }),
  ],

  markdown: {
    // Code is coloured for both light and dark; the stylesheet picks which set shows
    shikiConfig: {
      themes: { light: 'min-light', dark: 'min-dark' },
      defaultColor: false,
    },
    rehypePlugins: [[tidyLinksAndImages, { home: site.url }]],
  },
});
