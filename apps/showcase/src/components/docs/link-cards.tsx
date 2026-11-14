import { Card, Reveal } from '@crazy-staff/ui';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

export interface LinkCardItem {
  title: string;
  description: string;
  /** A docs path ("/docs/installation") or an external URL. */
  href: string;
  icon?: ReactNode;
}

/** A grid of link cards (docs pages or external links), rising in one after another. */
export function LinkCards({ items }: { items: LinkCardItem[] }) {
  return (
    <Reveal.Group className="not-prose my-6 grid gap-3 sm:grid-cols-2" stagger={0.04}>
      {items.map((item) => {
        const external = /^https?:/.test(item.href);
        const body = (
          <Card.Root interactive className="flex h-full gap-3 p-4">
            {item.icon && (
              <span className="squircle flex size-9 shrink-0 items-center justify-center rounded-control-sm bg-accent-soft text-accent-soft-foreground [&_svg]:size-4">
                {item.icon}
              </span>
            )}
            <span className="flex min-w-0 flex-col">
              <span className="flex items-center gap-1.5 text-sm font-semibold">
                {item.title}
                {external && <ArrowUpRight className="size-3.5 text-muted" />}
              </span>
              <span className="mt-1 text-sm text-muted">{item.description}</span>
            </span>
          </Card.Root>
        );
        const cls = 'block h-full rounded-card outline-none focus-visible:ring-2 focus-visible:ring-ring';
        return (
          <Reveal.Item key={item.href}>
            {external ? (
              <a href={item.href} target="_blank" rel="noreferrer noopener" className={cls}>
                {body}
              </a>
            ) : (
              <Link to={item.href} className={cls}>
                {body}
              </Link>
            )}
          </Reveal.Item>
        );
      })}
    </Reveal.Group>
  );
}
