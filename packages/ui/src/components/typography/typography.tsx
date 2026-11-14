import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { proseStyles, typographyStyles } from './typography.styles';

const s = typographyStyles();

export interface ProseProps extends useRender.ComponentProps<'div'>, VariantProps<typeof proseStyles> {}

/**
 * Styles every element inside: headings, paragraphs, lists, quotes, code, tables, links. Use it around
 * rendered markdown or CMS content. `render={<article />}` changes the element.
 */
export function Prose({ className, size, render, ...props }: ProseProps) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps<'div'>({ className: cn(proseStyles({ size }), className) }, props),
  });
}

type Slot = keyof ReturnType<typeof typographyStyles>;

/** Makes a part: a fixed element with one slot's classes, still overridable via `render`. */
function part<T extends keyof React.JSX.IntrinsicElements>(tag: T, slot: Slot, name: string) {
  function Part({ className, render, ...props }: useRender.ComponentProps<T>) {
    return useRender({
      defaultTagName: tag,
      render,
      props: mergeProps<T>({ className: cn(s[slot](), className) } as never, props as never),
    });
  }
  Part.displayName = `Typography.${name}`;
  return Part;
}

const H1 = part('h1', 'h1', 'H1');
const H2 = part('h2', 'h2', 'H2');
const H3 = part('h3', 'h3', 'H3');
const H4 = part('h4', 'h4', 'H4');
const P = part('p', 'p', 'P');
const Lead = part('p', 'lead', 'Lead');
const Large = part('div', 'large', 'Large');
const Small = part('small', 'small', 'Small');
const Muted = part('p', 'muted', 'Muted');
const Blockquote = part('blockquote', 'blockquote', 'Blockquote');
const List = part('ul', 'list', 'List');
const InlineCode = part('code', 'inlineCode', 'InlineCode');
const Link = part('a', 'link', 'Link');
const Kbd = part('kbd', 'kbd', 'Kbd');

/**
 * Text parts with the same look as `Prose`, for UI text outside long-form content:
 *   <Typography.H2>Roadmap</Typography.H2> <Typography.Lead>What we build next.</Typography.Lead>
 * Each part takes `render` to swap the element (`<Typography.H2 render={<h3 />}>` keeps the h2 look).
 */
export const Typography = {
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Muted,
  Blockquote,
  List,
  InlineCode,
  Link,
  Kbd,
  Prose,
};
