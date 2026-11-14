import { Card, Chip, Reveal } from '@crazy-staff/ui';
import { Link } from '@tanstack/react-router';
import { components } from './component-list';

/** All components as cards; planned ones are dimmed and not linked. */
export function ComponentGrid() {
  const sorted = [...components].sort((a, b) => Number(b.status === 'ready') - Number(a.status === 'ready') || a.name.localeCompare(b.name));
  return (
    <Reveal.Group className="not-prose my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.025}>
      {sorted.map((c) => {
        const body = (
          <Card.Root interactive={c.status === 'ready'} className="h-full p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold">{c.name}</span>
              {c.status === 'ready' ? <Chip size="sm">ready</Chip> : <Chip size="sm" variant="neutral">planned</Chip>}
            </div>
            <p className="mt-1.5 text-sm text-muted">{c.description}</p>
          </Card.Root>
        );
        return (
          <Reveal.Item key={c.slug} className={c.status === 'ready' ? undefined : 'opacity-60'}>
            {c.status === 'ready' ? (
              <Link to="/docs/$" params={{ _splat: `components/${c.slug}` }} className="block h-full rounded-card outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {body}
              </Link>
            ) : (
              body
            )}
          </Reveal.Item>
        );
      })}
    </Reveal.Group>
  );
}
