import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'crazy-ui';
export const docsRoute = '/docs';

export const gitConfig = {
  user: 'crazy-staff',
  repo: 'crazy-ui',
  branch: 'main',
};

const getDocsUrl = createGetUrl(docsRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs];
  if (segments.length === 0) {
    segments.push('index.md');
  } else {
    segments[segments.length - 1] += '.md';
  }
  return { segments, url: getDocsUrl(segments, page.locale) };
}
