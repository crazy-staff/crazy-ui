'use client';
import { Command, type CommandFilterOption } from '@crazy-staff/ui';
import { useRouter } from 'fumadocs-core/framework';
import { useStaticSearch, type SearchResultItem, type SearchResultRecord } from 'fumadocs-core/search/client';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import type { SharedProps } from 'fumadocs-ui/contexts/search';
import { AlignLeft, FileText, Hash } from 'lucide-react';
import { useMemo, useState } from 'react';

/** Tags match the sidebar separators; `routes/api/search.ts` puts them on every page. */
const SECTIONS: CommandFilterOption[] = [
  { value: 'all', label: 'All' },
  { value: 'getting-started', label: 'Getting started' },
  { value: 'foundations', label: 'Foundations' },
  { value: 'effects', label: 'Effects' },
  { value: 'components', label: 'Components' },
];

type Kind = 'pages' | 'headings' | 'all';
const KINDS: CommandFilterOption[] = [
  { value: 'pages', label: 'Pages', description: 'Only page titles' },
  { value: 'headings', label: 'Headings', description: 'Page titles and section headings' },
  { value: 'all', label: 'All', description: 'Pages, headings and text' },
];

interface Row {
  id: string;
  kind: 'jump' | 'page' | 'heading' | 'text';
  url: string;
  label: string;
  breadcrumbs: string[];
}

/** Markdown of a search hit as plain text; JSX tags are not text. */
const plain = (md: string) =>
  md
    .replace(/<\/?[A-Z][\w.]*(?:\s[^<>]*)?\/?>/g, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/(\*\*|__|`)/g, '')
    .replace(/^\s*(#+|>|[-*+]|\d+\.)\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

/** Bare identifiers such as `breadcrumbdemo` are leftovers of MDX components, not content. */
const isJunk = (text: string) => !/[\p{L}\p{N}]/u.test(text) || /^[a-z][a-z0-9]*$/.test(text);

function toRows(items: SearchResultItem[] | undefined, kind: Kind): Row[] {
  if (!items) return [];
  const records = items.flatMap((item): SearchResultRecord[] => (item.type === 'table' ? item.rows : [item]));
  const rows: Row[] = [];
  let section: string[] = [];
  let page = '';
  for (const r of records) {
    const label = plain(r.content);
    if (r.type === 'page') {
      section = (r.breadcrumbs ?? []).slice(1);
      page = label;
      rows.push({ id: r.id, kind: 'page', url: r.url, label, breadcrumbs: section });
      continue;
    }
    if (kind === 'pages' || (kind === 'headings' && r.type !== 'heading') || isJunk(label)) continue;
    rows.push({ id: r.id, kind: r.type, url: r.url, label, breadcrumbs: [...section, page] });
  }
  return rows;
}

const ICONS = { page: FileText, heading: Hash, text: AlignLeft };

export default function DocsSearchDialog({ open, onOpenChange, dialogHandle }: SharedProps) {
  const { locale } = useI18n();
  const router = useRouter();
  const [section, setSection] = useState('all');
  const [kind, setKind] = useState<Kind>('all');
  const search = useStaticSearch({ locale, tag: section === 'all' ? undefined : section });

  const rows = useMemo(() => {
    const list = toRows(search.data?.items, kind);
    const q = search.search.trim().toLowerCase();
    const target = q && list.find((r) => r.kind === 'page' && r.label.toLowerCase().startsWith(q));
    return target ? [{ ...target, id: `jump:${target.id}`, kind: 'jump' as const }, ...list] : list;
  }, [search.data, search.search, kind]);

  const filtered = section !== 'all' || kind !== 'all';
  const loading = search.isLoading && rows.length === 0;
  const emptyText = !search.search.trim()
    ? 'Type to search pages, headings and text.'
    : search.error
      ? 'Search failed. Try again.'
      : filtered
        ? 'No results. Try another word or clear the filters.'
        : 'No results. Try another word.';

  return (
    <Command.Dialog open={open} onOpenChange={onOpenChange} handle={dialogHandle} title="Search docs" className="max-w-3xl">
      <Command.Root
        items={rows}
        filter={null}
        itemToStringValue={(row: unknown) => (row as Row).label}
        search={search.search}
        onSearchChange={search.onSearchChange}
        aria-label="Search docs"
        className="min-h-0 rounded-none border-0"
      >
        <Command.Input placeholder="Search the docs…" aria-label="Search docs" />
        {loading ? <Command.Loading /> : <Command.Empty>{emptyText}</Command.Empty>}
        <Command.List className="max-h-[min(28rem,55vh)]">
          {(row: Row) => {
            const go = () => router.push(row.url);
            if (row.kind === 'jump')
              return (
                <Command.JumpItem key={row.id} value={row} onSelect={go}>
                  {row.label}
                </Command.JumpItem>
              );
            const Icon = ICONS[row.kind];
            return (
              <Command.Item key={row.id} value={row} onSelect={go}>
                <Icon aria-hidden />
                <Command.ItemContent>
                  {row.breadcrumbs.length > 0 && <Command.ItemBreadcrumbs items={row.breadcrumbs} />}
                  <Command.Highlight
                    text={row.label}
                    className={row.kind === 'text' ? 'line-clamp-2 text-sm text-foreground' : 'truncate text-sm font-medium text-foreground'}
                  />
                </Command.ItemContent>
              </Command.Item>
            );
          }}
        </Command.List>
        <Command.Footer className="items-start justify-between py-2">
          <Command.Filters
            canClear={filtered}
            onClear={() => {
              setSection('all');
              setKind('all');
            }}
          >
            <Command.Filter label="Section" options={SECTIONS} value={section} onValueChange={setSection} />
            <Command.Filter label="Results" options={KINDS} value={kind} defaultValue="all" onValueChange={(v) => setKind(v as Kind)} />
          </Command.Filters>
          <div className="flex h-7 shrink-0 items-center gap-3 max-md:hidden">
            <Command.Hint keys={['↑', '↓']}>move</Command.Hint>
            <Command.Hint keys="Enter">open</Command.Hint>
            <Command.Hint keys="Esc">close</Command.Hint>
          </div>
        </Command.Footer>
      </Command.Root>
    </Command.Dialog>
  );
}
