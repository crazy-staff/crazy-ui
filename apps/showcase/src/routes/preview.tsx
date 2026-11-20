import { createFileRoute } from '@tanstack/react-router';
import { Skeleton } from '@crazy-staff/ui';
import { Suspense, useEffect, useState } from 'react';
import { getExample } from '@/examples/registry';

/**
 * One example alone on a page, for the phone frames of the docs (`PhonePreview`): an iframe 390px
 * wide is a real phone-sized window, so `usePhone()` and the adaptive overlays switch to drawers.
 * `?name=<component>/<example>` picks the example, `&theme=light|dark` forces a theme.
 */
export const Route = createFileRoute('/preview')({
  component: PreviewPage,
});

function PreviewPage() {
  const [params, setParams] = useState<URLSearchParams | null>(null);
  useEffect(() => setParams(new URLSearchParams(location.search)), []);
  const theme = params?.get('theme');
  useEffect(() => {
    if (theme !== 'light' && theme !== 'dark') return;
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    root.style.colorScheme = theme;
    // next-themes may re-apply the stored theme after hydration: keep the forced one
    const observer = new MutationObserver(() => {
      if (root.classList.contains('dark') !== (theme === 'dark')) {
        root.classList.toggle('dark', theme === 'dark');
        root.classList.toggle('light', theme === 'light');
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [theme]);
  if (!params) return null;
  const example = getExample(params.get('name') ?? '');
  if (!example) return <p className="p-6 text-danger">Missing example: {params.get('name')}</p>;
  const { Component } = example;
  return (
    <main className="flex min-h-svh flex-col items-start bg-background p-4 text-foreground">
      <Suspense fallback={<Skeleton className="block h-10 w-48" />}>
        <Component />
        <Ready />
      </Suspense>
    </main>
  );
}

/** Marks the page once the lazy example has rendered (for the visual tests). */
function Ready() {
  useEffect(() => {
    document.documentElement.dataset.previewReady = '';
  }, []);
  return null;
}
