import { Combobox } from '@crazy-staff/ui';
import { Search } from 'lucide-react';

const posts = [
  { value: 'p1', label: 'Teleport to the last waypoint', votes: 128 },
  { value: 'p2', label: 'Save hotkeys per profile', votes: 96 },
  { value: 'p3', label: 'Gothic 2 support', votes: 412 },
  { value: 'p4', label: 'Show FPS in the overlay', votes: 37 },
];

export default function ComboboxCompound() {
  return (
    <Combobox.Root items={posts} itemToStringLabel={(p: (typeof posts)[number]) => p.label}>
      <Combobox.InputGroup className="w-80">
        <Search className="size-4 shrink-0 text-muted" />
        <Combobox.Input placeholder="Link a duplicate post…" aria-label="Duplicate of" />
        <Combobox.Actions>
          <Combobox.Clear />
        </Combobox.Actions>
      </Combobox.InputGroup>
      <Combobox.Content>
        <Combobox.Empty>No posts found.</Combobox.Empty>
        <Combobox.List>
          {(post: (typeof posts)[number]) => (
            <Combobox.Item key={post.value} value={post}>
              <span className="flex-1 truncate">{post.label}</span>
              <span className="text-xs text-muted tabular-nums">{post.votes} votes</span>
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );
}
