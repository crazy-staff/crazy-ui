import { cn } from '@crazy-staff/ui';
import { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/** The live example box on a docs page. `glow` fills it with the accent gradient. */
export function Preview({
  children,
  glow = false,
  className,
  align = 'center',
}: {
  children: ReactNode;
  glow?: boolean;
  className?: string;
  align?: 'center' | 'start' | 'stretch';
}) {
  return (
    <div className="not-prose squircle relative my-6 overflow-hidden rounded-card border border-border bg-surface">
      {glow && <div aria-hidden className="glow pointer-events-none absolute inset-0" />}
      <div
        className={cn(
          'relative flex min-h-36 flex-wrap gap-3 p-6 sm:p-8',
          align === 'center' && 'items-center justify-center',
          align === 'start' && 'items-start justify-start',
          align === 'stretch' && 'flex-col items-stretch',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * The accent gradient across the top of the page panel (fades out, never cut off). Rendered into
 * the panel itself: inside the page, the enter animation's transform would make it the glow's
 * frame and cut the glow to the article's width.
 */
export function PageGlow() {
  const [panel, setPanel] = useState<HTMLElement | null>(null);
  useEffect(() => setPanel(document.getElementById('nd-page-panel')), []);
  if (!panel) return null;
  return createPortal(
    <div aria-hidden data-page-glow="" className="glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem]" />,
    panel,
  );
}

/** A row of examples with a small mono label. */
export function Example({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-6">
      <span className="w-24 shrink-0 font-mono text-[0.6875rem] uppercase tracking-wider text-muted">{label}</span>
      <div className="flex flex-wrap items-center gap-2.5">{children}</div>
    </div>
  );
}
