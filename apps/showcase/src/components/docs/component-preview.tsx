import { cn } from '@crazy-staff/ui';
import { getExample } from '@/examples/registry';
import { CollapsibleCode } from './code';

/**
 * A live example and its source in one frame: the preview on top, the code folded underneath.
 * `name` is the example file under src/examples, e.g. "alert/destructive".
 */
export function ComponentPreview({
  name,
  align = 'center',
  glow = false,
  className,
}: {
  name: string;
  align?: 'center' | 'start' | 'stretch';
  glow?: boolean;
  className?: string;
}) {
  const example = getExample(name);
  if (!example) {
    return <p className="text-danger">Missing example: {name}</p>;
  }
  const { Component, source } = example;
  return (
    <div className="not-prose squircle my-6 overflow-hidden rounded-card border border-border bg-surface">
      <div className="relative">
        {glow && <div aria-hidden className="glow pointer-events-none absolute inset-0" />}
        <div
          className={cn(
            'relative flex min-h-48 flex-wrap gap-3 p-6 sm:p-10',
            align === 'center' && 'items-center justify-center',
            align === 'start' && 'items-start justify-start',
            align === 'stretch' && 'flex-col items-stretch',
            className,
          )}
        >
          <Component />
        </div>
      </div>
      <div className="border-t border-border">
        <CollapsibleCode code={source} flush />
      </div>
    </div>
  );
}
