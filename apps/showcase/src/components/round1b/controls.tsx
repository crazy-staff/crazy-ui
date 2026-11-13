import { cn } from '@crazy-staff/ui';
import { motion } from 'motion/react';
import * as React from 'react';

/** A small segmented control with a gliding thumb (showcase-only for now; menus are round 3). */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  label: string;
}) {
  const id = React.useId();
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="squircle flex h-control-sm items-center gap-0.5 rounded-control-sm border border-border bg-surface-2/60 p-0.5"
    >
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.value)}
            className={cn(
              'relative h-full rounded-[calc(var(--radius-control-sm)-3px)] px-3 text-xs font-medium outline-none',
              'transition-colors duration-[var(--cui-duration-fast)] focus-visible:ring-2 focus-visible:ring-ring',
              on ? 'text-foreground' : 'text-muted hover:text-foreground',
            )}
          >
            {on && (
              <motion.span
                layoutId={`seg-${id}`}
                transition={{ type: 'spring', stiffness: 520, damping: 40 }}
                className="squircle absolute inset-0 rounded-[calc(var(--radius-control-sm)-3px)] bg-background shadow-control"
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} data-section className="scroll-mt-6 flex flex-col gap-4">
      <div>
        <h2 className="font-heading text-xl font-[weight:var(--cui-heading-weight)] tracking-[var(--cui-heading-tracking)]">
          {title}
        </h2>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
}

/** A labelled row inside a demo card. */
export function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-6">
      <span className="w-28 shrink-0 font-mono text-[0.6875rem] uppercase tracking-wider text-muted">{label}</span>
      <div className="flex flex-wrap items-center gap-2.5">{children}</div>
    </div>
  );
}
