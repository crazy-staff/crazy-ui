import { Chip, Command } from '@crazy-staff/ui';
import { ArrowUp, MessageSquare } from 'lucide-react';

const posts = [
  { value: 'p1', label: 'Gothic 2 support', votes: 412, status: 'planned' },
  { value: 'p2', label: 'Teleport to the last waypoint', votes: 128, status: 'in progress' },
  { value: 'p3', label: 'Save hotkeys per profile', votes: 96, status: 'open' },
  { value: 'p4', label: 'Show FPS in the overlay', votes: 37, status: 'open' },
];

export default function CommandCompound() {
  return (
    <Command.Root items={posts} aria-label="Search posts" className="max-w-md">
      <Command.Input placeholder="Search posts…" aria-label="Search posts" />
      <Command.Empty>No posts match. Post a new idea instead?</Command.Empty>
      <Command.List>
        {(post: (typeof posts)[number]) => (
          <Command.Item key={post.value} value={post} onSelect={() => console.log('open', post.value)}>
            <MessageSquare />
            <span className="flex-1 truncate">{post.label}</span>
            <Chip size="sm" variant="neutral">{post.status}</Chip>
            <span className="flex w-12 items-center justify-end gap-1 text-xs text-muted tabular-nums">
              <ArrowUp className="size-3!" />
              {post.votes}
            </span>
          </Command.Item>
        )}
      </Command.List>
      <Command.Footer>
        <span>{posts.length} posts</span>
      </Command.Footer>
    </Command.Root>
  );
}
