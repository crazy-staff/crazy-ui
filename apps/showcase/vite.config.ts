import react from '@vitejs/plugin-react';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { fumadocsMdx } from 'fumadocs-mdx/vite';
import { nitro } from 'nitro/vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    fumadocsMdx(),
    tailwindcss(),
    tanstackStart({
      spa: {
        enabled: true,
        prerender: {
          enabled: true,
          crawlLinks: false,
        },
      },
      pages: [{ path: '/docs' }, { path: '/api/search' }],
    }),
    react(),
    nitro(),
  ],
  resolve: {
    tsconfigPaths: true,
    alias: [
      { find: 'tslib', replacement: 'tslib/tslib.es6.js' },
      // Fumadocs can reach Shiki's Oniguruma WebAssembly, which the bundler can't resolve; we only
      // use the JavaScript regex engine
      { find: /^shiki\/wasm$/, replacement: fileURLToPath(new URL('./src/lib/empty-wasm.ts', import.meta.url)) },
      // MDX files are outside tsconfig's include, so `@/` needs a plain alias for them
      { find: /^@\//, replacement: `${fileURLToPath(new URL('./src/', import.meta.url))}` },
      // the showcase runs on the library's sources, so edits hot-reload without a rebuild
      {
        find: /^@crazy-staff\/ui$/,
        replacement: fileURLToPath(new URL('../../packages/ui/src/index.ts', import.meta.url)),
      },
    ],
  },
});
