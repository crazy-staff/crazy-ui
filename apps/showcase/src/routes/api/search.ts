import { createFileRoute } from '@tanstack/react-router';
import type { StructuredData } from 'fumadocs-core/mdx-plugins';
import type { Node, Root } from 'fumadocs-core/page-tree';
import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';

/** `Getting started` → `getting-started`: the tag the search dialog's "Section" filter asks for. */
const sectionTag = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/** Page URL → tag of the sidebar separator (section) it sits under. */
function sectionsByUrl(tree: Root) {
  const out = new Map<string, string>();
  let section = '';
  const visit = (node: Node) => {
    if (node.type === 'separator') section = typeof node.name === 'string' ? sectionTag(node.name) : section;
    else if (node.type === 'page') out.set(node.url, section);
    else if (node.type === 'folder') {
      if (node.index) out.set(node.index.url, section);
      node.children.forEach(visit);
    }
  };
  tree.children.forEach(visit);
  return out;
}

/** JSX tags (`<ComponentPreview name="…" />`, `<Kbd>`) are not text: drop them, and blocks made only of them. */
const JSX_TAG = /<\/?[A-Z][\w.]*(?:\s[^<>]*)?\/?>/g;
const cleanContents = (data: StructuredData): StructuredData => ({
  ...data,
  contents: data.contents
    .map((c) => ({ ...c, content: c.content.replace(JSX_TAG, '').replace(/\s{2,}/g, ' ').trim() }))
    .filter((c) => /[\p{L}\p{N}]/u.test(c.content)),
});

const sections = new WeakMap<Root, Map<string, string>>();
const sectionOf = (url: string) => {
  const tree = source.getPageTree();
  let map = sections.get(tree);
  if (!map) sections.set(tree, (map = sectionsByUrl(tree)));
  return map.get(url);
};

const server = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'english',
  async buildIndex(page) {
    const data = page.data as unknown as {
      structuredData?: StructuredData | (() => Promise<StructuredData>);
      load?: () => Promise<{ structuredData: StructuredData }>;
    };
    const structuredData =
      typeof data.structuredData === 'function'
        ? await data.structuredData()
        : (data.structuredData ?? (await data.load!()).structuredData);
    const section = sectionOf(page.url);
    return {
      title: page.data.title ?? page.url,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: cleanContents(structuredData),
      tag: section ? [section] : undefined,
    };
  },
});

export const Route = createFileRoute('/api/search')({
  server: {
    handlers: {
      GET: () => server.staticGET(),
    },
  },
});
