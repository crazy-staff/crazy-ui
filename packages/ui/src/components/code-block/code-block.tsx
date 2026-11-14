import { Check, Copy, FileCode } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { Button, type ButtonProps } from '../button/button';
import { codeBlockStyles } from './code-block.styles';

const s = codeBlockStyles();

export interface CodeThemes {
  light: string;
  dark: string;
}

export interface HighlightOptions {
  lang: string;
  themes?: CodeThemes;
  /** 1-based line numbers to mark. */
  highlightLines?: number[];
}

const DEFAULT_THEMES: CodeThemes = { light: 'github-light', dark: 'github-dark' };
const cache = new Map<string, Promise<string>>();

type ShikiHighlighter = Awaited<ReturnType<(typeof import('shiki/core'))['createHighlighterCore']>>;
let highlighter: Promise<ShikiHighlighter> | undefined;

/**
 * One shared highlighter on Shiki's JavaScript regex engine. Built from `shiki/core` so bundlers
 * never pull in the Oniguruma WebAssembly file.
 */
function getHighlighter() {
  highlighter ??= Promise.all([import('shiki/core'), import('shiki/engine/javascript')]).then(
    ([{ createHighlighterCore }, { createJavaScriptRegexEngine }]) =>
      createHighlighterCore({ themes: [], langs: [], engine: createJavaScriptRegexEngine() }),
  );
  return highlighter;
}

/**
 * Highlights `code` with Shiki and returns HTML: `<pre><code><span class="line">…`. Tokens are painted
 * with `light-dark()`, so they follow the page's `color-scheme`. Shiki, the language and the themes
 * load on first use and results are cached. Unknown languages fall back to plain text.
 */
export function highlightCode(code: string, { lang, themes = DEFAULT_THEMES, highlightLines = [] }: HighlightOptions) {
  const key = JSON.stringify([code, lang, themes, highlightLines]);
  let result = cache.get(key);
  if (!result) {
    const marked = new Set(highlightLines);
    result = Promise.all([getHighlighter(), import('shiki/langs'), import('shiki/themes')]).then(
      async ([shiki, { bundledLanguages }, { bundledThemes }]) => {
      const known = lang in bundledLanguages;
      await Promise.all([
        known && !shiki.getLoadedLanguages().includes(lang)
          ? shiki.loadLanguage(bundledLanguages[lang as keyof typeof bundledLanguages])
          : null,
        ...[themes.light, themes.dark].map((theme) =>
          shiki.getLoadedThemes().includes(theme)
            ? null
            : shiki.loadTheme(bundledThemes[theme as keyof typeof bundledThemes]),
        ),
      ]);
      return shiki.codeToHtml(code, {
        lang: known ? lang : 'text',
        themes: { light: themes.light, dark: themes.dark },
        defaultColor: 'light-dark()',
        transformers: [
          {
            pre(node) {
              // the frame paints the background (Shiki's would cover our surface token); classes are ours
              delete node.properties.style;
              delete node.properties.class;
            },
            code(node) {
              // lines are grid rows: drop the newline text nodes between them
              node.children = node.children.filter((child) => !(child.type === 'text' && child.value === '\n'));
            },
            line(node, line) {
              if (marked.has(line)) node.properties['data-highlighted'] = '';
            },
          },
        ],
      });
      },
    );
    cache.set(key, result);
  }
  return result;
}

export interface CodeBlockCopyProps extends Omit<ButtonProps, 'value'> {
  /** The text to copy. */
  value: string;
}

/** A button that copies `value` and shows a check for a moment. */
function CodeBlockCopy({ value, className, onClick, ...props }: CodeBlockCopyProps) {
  const [copied, setCopied] = React.useState(false);
  const reduced = useReducedMotion();
  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);
  const icon = { initial: { opacity: 0, scale: 0.6 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.6 } };
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={copied ? 'Copied' : 'Copy code'}
      className={cn(s.copy(), className)}
      onClick={(event) => {
        onClick?.(event);
        void navigator.clipboard?.writeText(value).then(() => setCopied(true));
      }}
      {...props}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={copied ? 'check' : 'copy'} className="flex" transition={{ duration: reduced ? 0 : 0.15 }} {...icon}>
          {copied ? <Check /> : <Copy />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}

export interface CodeBlockProps extends Omit<React.ComponentPropsWithRef<'div'>, 'title'> {
  code: string;
  /** A Shiki language id. @default 'tsx' */
  lang?: string;
  /** A file name or title shown in a bar above the code. */
  title?: React.ReactNode;
  /** The icon before the title. @default <FileCode /> */
  icon?: React.ReactNode;
  lineNumbers?: boolean;
  /** 1-based line numbers to mark with the accent. */
  highlightLines?: number[];
  /** Fold code longer than this many lines behind a "View code" button. */
  collapsedLines?: number;
  /** Label of the unfold button. @default 'View code' */
  expandLabel?: string;
  /** Show the copy button. @default true */
  copyable?: boolean;
  /** Shiki themes for light and dark. @default { light: 'github-light', dark: 'github-dark' } */
  themes?: CodeThemes;
  classNames?: { header?: string; title?: string; pre?: string; copy?: string; fold?: string };
}

/**
 * Highlighted code with a copy button, an optional file-name bar, line numbers, marked lines and
 * folding for long snippets.
 *   <CodeBlock code={source} lang="ts" title="trainer.config.ts" lineNumbers highlightLines={[3]} />
 */
function CodeBlockRoot({
  code,
  lang = 'tsx',
  title,
  icon,
  lineNumbers = false,
  highlightLines,
  collapsedLines,
  expandLabel = 'View code',
  copyable = true,
  themes,
  className,
  classNames,
  ...props
}: CodeBlockProps) {
  const text = code.replace(/\n$/, '');
  const lines = React.useMemo(() => text.split('\n'), [text]);
  const [html, setHtml] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const foldable = collapsedLines !== undefined && lines.length > collapsedLines;
  const folded = foldable && !open;
  const marks = highlightLines?.join(',');

  React.useEffect(() => {
    let live = true;
    highlightCode(text, { lang, themes, highlightLines })
      .then((out) => live && setHtml(out))
      .catch(() => live && setHtml(null));
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `marks` stands for `highlightLines`
  }, [text, lang, themes?.light, themes?.dark, marks]);

  const preClass = cn(s.pre(), lineNumbers && s.lineNumbers(), classNames?.pre);
  const marked = new Set(highlightLines);

  return (
    <div data-lang={lang} className={cn(s.root(), className)} {...props}>
      {title && (
        <div className={cn(s.header(), classNames?.header)}>
          {icon ?? <FileCode aria-hidden />}
          <span className={cn(s.title(), classNames?.title)}>{title}</span>
        </div>
      )}
      <div
        className={s.body()}
        // 1.5rem per line + the vertical padding of the pre
        style={folded ? { maxHeight: `calc(${collapsedLines} * 1.5rem + 1.75rem)`, overflow: 'hidden' } : undefined}
      >
        {html ? (
          <div className="contents" dangerouslySetInnerHTML={{ __html: html.replace('<pre', `<pre class="${preClass.replaceAll('&', '&amp;')}"`) }} />
        ) : (
          <pre className={preClass} tabIndex={0}>
            <code>
              {lines.map((line, i) => (
                <span key={i} className="line" data-highlighted={marked.has(i + 1) ? '' : undefined}>
                  {line}
                </span>
              ))}
            </code>
          </pre>
        )}
        {copyable && <CodeBlockCopy value={text} className={classNames?.copy} />}
        {folded && (
          <div className={cn(s.fold(), classNames?.fold)}>
            <Button size="sm" variant="outline" className={s.foldButton()} aria-expanded={false} onClick={() => setOpen(true)}>
              {expandLabel}
            </Button>
          </div>
        )}
      </div>
      {foldable && open && (
        <div className={s.foldOpen()}>
          <Button size="sm" variant="ghost" aria-expanded onClick={() => setOpen(false)}>
            Collapse
          </Button>
        </div>
      )}
    </div>
  );
}

export const CodeBlock = Object.assign(CodeBlockRoot, { Copy: CodeBlockCopy });
