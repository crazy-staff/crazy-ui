import { Button, cn } from '@crazy-staff/ui';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { useState } from 'react';

/** A highlighted code block. */
export function Code({ code, lang = 'tsx', title, lineNumbers = false }: { code: string; lang?: string; title?: string; lineNumbers?: boolean }) {
  return (
    <DynamicCodeBlock
      lang={lang}
      code={code}
      codeblock={{ title, 'data-line-numbers': lineNumbers, className: 'my-0' }}
    />
  );
}

/**
 * Code that starts folded to a few lines with a "View code" button (like shadcn/ui), so long
 * examples don't push the page apart.
 */
export function CollapsibleCode({
  code,
  lang = 'tsx',
  title,
  label = 'View code',
  className,
  flush = false,
}: {
  code: string;
  lang?: string;
  title?: string;
  label?: string;
  className?: string;
  /** Inside another frame (preview): no own border and corners. */
  flush?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const short = code.split('\n').length <= 4;
  return (
    <div
      data-open={open || short ? '' : undefined}
      className={cn('cui-code relative', flush && 'cui-code-flush', className)}
    >
      <div className={cn('overflow-hidden', !open && !short && 'max-h-28')}>
        <Code code={code} lang={lang} title={title} lineNumbers />
      </div>
      {!short && (
        <div
          className={cn(
            'flex justify-center',
            open
              ? 'py-2'
              : 'pointer-events-none absolute inset-x-0 bottom-0 items-end bg-linear-to-b from-transparent to-surface pt-14 pb-3',
          )}
        >
          <Button size="sm" variant="outline" className="pointer-events-auto bg-background" onClick={() => setOpen((o) => !o)}>
            {open ? 'Collapse' : label}
          </Button>
        </div>
      )}
    </div>
  );
}
