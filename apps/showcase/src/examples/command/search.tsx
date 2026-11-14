import { Command } from '@crazy-staff/ui';
import { FileText, Hash } from 'lucide-react';
import { useMemo, useState } from 'react';

const results = [
  { id: 'install', kind: 'page', section: 'guide', title: 'Installation', path: ['Guide'] },
  { id: 'install-union', kind: 'heading', section: 'guide', title: 'Install Union', path: ['Guide', 'Installation'] },
  { id: 'hotkeys', kind: 'page', section: 'guide', title: 'Hotkeys', path: ['Guide'] },
  { id: 'god', kind: 'page', section: 'features', title: 'God mode', path: ['Features'] },
  { id: 'god-falls', kind: 'heading', section: 'features', title: 'Fall damage', path: ['Features', 'God mode'] },
  { id: 'teleport', kind: 'page', section: 'features', title: 'Teleport', path: ['Features'] },
  { id: 'teleport-marker', kind: 'heading', section: 'features', title: 'Teleport to the map marker', path: ['Features', 'Teleport'] },
];

const sections = [
  { value: 'all', label: 'All' },
  { value: 'guide', label: 'Guide' },
  { value: 'features', label: 'Features' },
];
const kinds = [
  { value: 'all', label: 'All', description: 'Pages and headings' },
  { value: 'page', label: 'Pages', description: 'Only page titles' },
];

type Result = (typeof results)[number];
type Row = Result & { jump?: boolean };

export default function CommandSearch() {
  const [search, setSearch] = useState('');
  const [section, setSection] = useState('all');
  const [kind, setKind] = useState('all');

  const rows = useMemo<Row[]>(() => {
    const q = search.trim().toLowerCase();
    const list = results.filter(
      (r) => (section === 'all' || r.section === section) && (kind === 'all' || r.kind === kind) && r.title.toLowerCase().includes(q),
    );
    const target = q && list.find((r) => r.kind === 'page' && r.title.toLowerCase().startsWith(q));
    return target ? [{ ...target, id: `jump-${target.id}`, jump: true }, ...list] : list;
  }, [search, section, kind]);

  return (
    <Command.Root items={rows} filter={null} search={search} onSearchChange={setSearch} aria-label="Search the trainer docs" className="max-w-xl">
      <Command.Input placeholder="Search the trainer docs…" aria-label="Search the trainer docs" />
      <Command.Empty>No results. Try another word or clear the filters.</Command.Empty>
      <Command.List>
        {(row: Row) =>
          row.jump ? (
            <Command.JumpItem key={row.id} value={row}>
              {row.title}
            </Command.JumpItem>
          ) : (
            <Command.Item key={row.id} value={row}>
              {row.kind === 'page' ? <FileText /> : <Hash />}
              <Command.ItemContent>
                <Command.ItemBreadcrumbs items={row.path} />
                <Command.Highlight text={row.title} className="truncate font-medium" />
              </Command.ItemContent>
            </Command.Item>
          )
        }
      </Command.List>
      <Command.Footer className="items-start justify-between py-2">
        <Command.Filters
          canClear={section !== 'all' || kind !== 'all'}
          onClear={() => {
            setSection('all');
            setKind('all');
          }}
        >
          <Command.Filter label="Section" options={sections} value={section} onValueChange={setSection} />
          <Command.Filter label="Results" options={kinds} value={kind} onValueChange={setKind} />
        </Command.Filters>
        <div className="flex h-7 shrink-0 items-center gap-3 max-sm:hidden">
          <Command.Hint keys={['↑', '↓']}>move</Command.Hint>
          <Command.Hint keys="Enter">open</Command.Hint>
        </div>
      </Command.Footer>
    </Command.Root>
  );
}
