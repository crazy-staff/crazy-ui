import { Command } from '@crazy-staff/ui';
import { MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

const posts = [
  { value: 'p1', label: 'Gothic 2 support', breadcrumbs: ['Ideas', 'Planned'] },
  { value: 'p2', label: 'Teleport to the last waypoint', breadcrumbs: ['Ideas', 'In progress'] },
  { value: 'p3', label: 'Save hotkeys per profile', breadcrumbs: ['Ideas', 'Open'] },
  { value: 'p4', label: 'Crash when saving in the Old Camp', breadcrumbs: ['Bugs', 'Open'] },
];

type Post = (typeof posts)[number];

/** Pretends to ask the server. */
function useServerSearch(query: string) {
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) return setResults([]);
    setLoading(true);
    const timer = setTimeout(() => {
      setResults(posts.filter((p) => p.label.toLowerCase().includes(q)));
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [query]);
  return { results, loading };
}

export default function CommandLoading() {
  const [search, setSearch] = useState('');
  const { results, loading } = useServerSearch(search);

  return (
    <Command.Root items={loading ? [] : results} filter={null} search={search} onSearchChange={setSearch} aria-label="Search posts" className="max-w-md">
      <Command.Input placeholder="Search ideas and bugs…" aria-label="Search posts" />
      {loading ? (
        <Command.Loading>Searching posts…</Command.Loading>
      ) : (
        <Command.Empty>{search ? 'No posts match.' : 'Type to search, e.g. “save”.'}</Command.Empty>
      )}
      <Command.List>
        {(post: Post) => (
          <Command.Item key={post.value} value={post}>
            <MessageSquare />
            <Command.ItemContent>
              <Command.ItemBreadcrumbs items={post.breadcrumbs} />
              <Command.Highlight text={post.label} className="truncate" />
            </Command.ItemContent>
          </Command.Item>
        )}
      </Command.List>
    </Command.Root>
  );
}
