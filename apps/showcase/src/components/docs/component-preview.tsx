import { Skeleton, cn } from '@crazy-staff/ui';
import { Suspense, useEffect, useState } from 'react';
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
  const example = useMemoExample(name);
  const [source, setSource] = useState<string | null>(null);
  useEffect(() => {
    let live = true;
    void example?.loadSource().then((s) => live && setSource(s));
    return () => {
      live = false;
    };
  }, [example]);
  if (!example) {
    return <p className="text-danger">Missing example: {name}</p>;
  }
  const { Component } = example;
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
          <Suspense fallback={<Skeleton className="block h-10 w-48" />}>
            <Component />
          </Suspense>
        </div>
      </div>
      <div className="border-t border-border">
        {source === null ? <div className="h-28" /> : <CollapsibleCode code={source} flush />}
      </div>
    </div>
  );
}

function useMemoExample(name: string) {
  const [example] = useState(() => getExample(name));
  return example;
}
