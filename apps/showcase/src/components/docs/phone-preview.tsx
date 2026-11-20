import { cn } from '@crazy-staff/ui';
import { RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getExample } from '@/examples/registry';
import { CollapsibleCode } from './code';

/**
 * An example in a phone-sized frame (390 × `height`): an iframe of `/preview`, so the example sees a
 * real phone window and its menus, popovers and pickers open as drawers. `theme` forces light or
 * dark (else it follows the docs). The source is folded underneath, like `ComponentPreview`.
 */
export function PhonePreview({
  name,
  height = 640,
  theme,
  label,
  code = true,
  scale = 1,
  className,
}: {
  name: string;
  height?: number;
  theme?: 'light' | 'dark';
  /** A small caption above the frame (a variant's name). */
  label?: string;
  code?: boolean;
  /** Draw the frame smaller (the example still sees a 390px window). */
  scale?: number;
  className?: string;
}) {
  const [key, setKey] = useState(0);
  const [source, setSource] = useState<string | null>(null);
  useEffect(() => {
    if (!code) return;
    let live = true;
    void getExample(name)
      ?.loadSource()
      .then((s) => live && setSource(s));
    return () => {
      live = false;
    };
  }, [name, code]);
  const src = `/preview/?name=${encodeURIComponent(name)}${theme ? `&theme=${theme}` : ''}`;
  return (
    <figure className={cn('not-prose my-6 flex flex-col gap-2', className)}>
      {label && (
        <figcaption className="flex items-center justify-between gap-2 font-mono text-[0.6875rem] tracking-wider text-muted uppercase">
          {label}
          <button
            type="button"
            aria-label="Replay"
            title="Replay"
            onClick={() => setKey((k) => k + 1)}
            className="squircle inline-flex size-7 items-center justify-center rounded-control-sm hover:bg-hover hover:text-foreground [&_svg]:size-3.5"
          >
            <RotateCcw />
          </button>
        </figcaption>
      )}
      <div
        className="squircle mx-auto overflow-hidden rounded-[2rem] border border-border bg-surface p-0 shadow-card"
        style={{ width: 390 * scale + 2, height: height * scale + 2 }}
      >
        <iframe
          key={key}
          title={label ?? name}
          src={src}
          loading="lazy"
          width={390}
          height={height}
          className="block border-0"
          style={scale === 1 ? undefined : { transform: `scale(${scale})`, transformOrigin: '0 0' }}
        />
      </div>
      {code && source !== null && (
        <div className="squircle overflow-hidden rounded-card border border-border">
          <CollapsibleCode code={source} flush />
        </div>
      )}
    </figure>
  );
}

/** Variants of a design round side by side: each in light and dark phone frames. */
export function PhoneVariants({
  variants,
  height = 560,
}: {
  variants: { label: string; name: string }[];
  height?: number;
}) {
  return (
    <div className="not-prose my-6 flex flex-col gap-6">
      {variants.map((v) => (
        <section key={v.name} className="squircle flex flex-col gap-3 rounded-card border border-border bg-surface/50 p-4">
          <h3 className="text-base font-semibold">{v.label}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <PhonePreview name={v.name} theme="light" label="Light" height={height} scale={0.72} code={false} className="my-0" />
            <PhonePreview name={v.name} theme="dark" label="Dark" height={height} scale={0.72} code={false} className="my-0" />
          </div>
        </section>
      ))}
    </div>
  );
}
