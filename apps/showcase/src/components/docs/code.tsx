import { CodeBlock, cn } from '@crazy-staff/ui';

/** A highlighted code block (our own Code Block component). */
export function Code({ code, lang = 'tsx', title, lineNumbers = false }: { code: string; lang?: string; title?: string; lineNumbers?: boolean }) {
  return <CodeBlock code={code} lang={lang} title={title} lineNumbers={lineNumbers} />;
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
  return (
    <CodeBlock
      code={code}
      lang={lang}
      title={title}
      lineNumbers
      collapsedLines={4}
      expandLabel={label}
      className={cn(flush && 'rounded-none border-0 [corner-shape:round] [--corner-shape:round]', className)}
    />
  );
}
