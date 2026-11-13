import { cn } from '@crazy-staff/ui';
import type { ReactNode } from 'react';

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

/** The accent gradient across the top of the page panel (fades out, never cut off). */
export function PageGlow() {
  return <div aria-hidden data-page-glow="" className="glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem]" />;
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
