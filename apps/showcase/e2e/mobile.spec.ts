import { expect, type Page, test } from '@playwright/test';

/** One example alone on the phone-sized preview page, in the given theme. */
async function open(page: Page, name: string, theme: 'light' | 'dark') {
  await page.goto(`/preview/?name=${encodeURIComponent(name)}&theme=${theme}`);
  await page.locator('html[data-preview-ready]').waitFor({ state: 'attached' });
  await page.evaluate(() => document.fonts.ready);
}

const cases: { name: string; open: (page: Page) => Promise<void> }[] = [
  {
    name: 'dropdown-menu/phone',
    open: (page) => page.getByRole('button', { name: 'Language' }).click(),
  },
  {
    name: 'popover/phone',
    open: (page) => page.getByRole('button', { name: 'Filters' }).click(),
  },
  {
    name: 'choice-field/settings',
    open: (page) => page.getByRole('button', { name: 'Theme' }).click(),
  },
  {
    name: 'sidebar/phone',
    open: (page) => page.getByRole('button', { name: 'Open menu' }).click(),
  },
  {
    name: 'side-panel/default',
    open: (page) => page.getByRole('button', { name: 'Moderation' }).click(),
  },
];

for (const theme of ['light', 'dark'] as const) {
  for (const c of cases) {
    const file = c.name.replace('/', '-');
    test(`${c.name} on a phone (${theme})`, async ({ page }) => {
      await open(page, c.name, theme);
      await expect(page).toHaveScreenshot(`${file}-${theme}.png`);
      await c.open(page);
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.waitForTimeout(400);
      await expect(page).toHaveScreenshot(`${file}-open-${theme}.png`);
    });
  }
}
