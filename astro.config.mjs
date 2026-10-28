import path from 'node:path';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// In `npm run dev`, an edit to PROFILE.md reloads every page, so the preview always shows the file as it is.
const profileReload = {
  name: 'profile-reload',
  configureServer(server) {
    const file = path.resolve('PROFILE.md');
    server.watcher.add(file);
    server.watcher.on('change', (changed) => {
      if (path.resolve(changed) === file) {
        server.moduleGraph.invalidateAll();
        server.ws.send({ type: 'full-reload' });
      }
    });
  },
};

export default defineConfig({
  site: 'https://pctablet505.github.io',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') && !page.endsWith('/social-card/') })],
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  vite: { plugins: [profileReload] },
});
