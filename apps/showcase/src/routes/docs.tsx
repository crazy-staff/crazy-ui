import { createFileRoute, Outlet } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import { DocsLayout } from 'fumadocs-ui/layouts/spacious';
import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { SIDEBAR_SLOTS } from '@/components/docs/sidebar';
import { Actions } from '@/components/docs/actions';

/** The docs frame: loaded once, so the sidebar stays put while pages change. */
export const Route = createFileRoute('/docs')({
  component: Layout,
  loader: async () => treeLoader(),
  staleTime: Infinity,
});

const treeLoader = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .handler(async () => ({ pageTree: await source.serializePageTree(source.getPageTree()) }));

function Layout() {
  const { pageTree } = useFumadocsLoader(Route.useLoaderData());
  return (
    <DocsLayout {...baseOptions()} tree={pageTree} tabs={false} slots={{ sidebar: SIDEBAR_SLOTS, actions: Actions }}>
      <Outlet />
    </DocsLayout>
  );
}
