import { defineConfig, devices } from '@playwright/test';

/**
 * Visual snapshots of the showcase at a phone viewport (390 × 844), light and dark. Runs against the
 * built site (`bun run build` first): `bun run test:visual`, `-- --update-snapshots` to accept changes.
 */
export default defineConfig({
  testDir: './e2e',
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.02, animations: 'disabled', caret: 'hide' },
  },
  use: {
    baseURL: 'http://localhost:4173',
    reducedMotion: 'reduce',
    ...devices['Desktop Chrome'],
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  },
  projects: [{ name: 'chromium' }],
  webServer: {
    command: 'python3 -m http.server 4173 --directory .output/public',
    url: 'http://localhost:4173/preview/',
    reuseExistingServer: !process.env.CI,
    stderr: 'ignore',
  },
});
