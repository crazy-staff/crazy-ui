import { createFileRoute, notFound } from '@tanstack/react-router';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/spacious/page';
import { createServerFn } from '@tanstack/react-start';
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions';
import { Suspense, use, useEffect, useState } from 'react';
import { docs, source } from '@/lib/source';
import { useMDXComponents } from '@/components/mdx';
import { PageTransition } from '@/components/docs/page-transition';
import { PageSkeleton } from '@/components/docs/page-skeleton';
import { gitConfig } from '@/lib/shared';
import { SquarePen } from 'lucide-react';

export const Route = createFileRoute('/docs/$')({
  component: Page,
  pendingComponent: PendingPage,
  pendingMs: 120,
  pendingMinMs: 250,
  loader: async ({ params }) => {
    const slugs = params._splat?.split('/').filter(Boolean) ?? [];
    const data = await loader({ data: slugs });
    await docs.getPage(data.path)?.preload();
    return data;
  },
});

const loader = createServerFn({ method: 'GET' })
  .validator((slugs: string[]) => slugs)
  .middleware([staticFunctionMiddleware])
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs);
    if (!page) throw notFound();
    const order = source.getPages().map((p) => p.url);
    return { path: page.path, url: page.url, position: order.indexOf(page.url) };
  });

/** Renders nothing; tells the page that everything before it (the MDX) has mounted. */
function Mounted({ onMount }: { onMount: () => void }) {
  useEffect(onMount, [onMount]);
  return null;
}

function PendingPage() {
  return (
    <DocsPage toc={[]}>
      <PageSkeleton />
    </DocsPage>
  );
}

function Content({ path, url, position }: { path: string; url: string; position: number }) {
  const page = docs.getPage(path);
  if (!page) throw new Error(`unknown page: ${path}`);
  const { toc } = use(page.load());
  const MDX = page.body;
  // "On this page" watches the headings by id: hand it the list only once they are in the DOM
  // (after client navigation the MDX can mount a moment after the page, and the scroll spy would
  // otherwise watch nothing)
  const [mounted, setMounted] = useState(false);
  const activeToc = mounted ? toc : [];

  return (
    <DocsPage toc={activeToc} tableOfContent={{ enabled: true, footer: <TocFooter path={path} empty={toc.length === 0} /> }}>
      <PageTransition id={url} position={position}>
        <div data-stagger="" className="flex flex-col gap-4">
          <DocsTitle>{page.title}</DocsTitle>
          <DocsDescription>{page.description}</DocsDescription>
        </div>
        <DocsBody data-stagger="">
          <MDX components={useMDXComponents()} />
          <Mounted onMount={() => setMounted(true)} />
        </DocsBody>
      </PageTransition>
    </DocsPage>
  );
}

/**
 * Always rendered under "On this page", so the column exists on every page and the content never
 * jumps sideways between pages with and without headings.
 */
function TocFooter({ path, empty }: { path: string; empty: boolean }) {
  return (
    <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4 text-sm">
      {empty && <p className="text-muted">This page has no sections.</p>}
      <a
        href={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/apps/showcase/content/docs/${path}`}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground [&_svg]:size-3.5"
      >
        <SquarePen /> Edit this page
      </a>
    </div>
  );
}

function Page() {
  const data = Route.useLoaderData();
  return (
    <Suspense fallback={<PendingPage />}>
      <Content key={data.path} {...data} />
    </Suspense>
  );
}
