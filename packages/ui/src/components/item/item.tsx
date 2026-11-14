import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { itemGroupStyles, itemMediaStyles, itemStyles } from './item.styles';

type Options = VariantProps<typeof itemStyles>;
const s = itemStyles();

export interface ItemRootProps extends useRender.ComponentProps<'div'>, Options {}

/** The row itself. Pass `render={<a href="…" />}` (or a router link) to make the whole row a link. */
function ItemRoot({ className, variant, size, render, ...props }: ItemRootProps) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps<'div'>({ className: cn(itemStyles({ variant, size }).root(), className), 'data-slot': 'item' } as React.ComponentProps<'div'>, props),
  });
}

export interface ItemMediaProps extends React.ComponentPropsWithRef<'div'>, VariantProps<typeof itemMediaStyles> {}

function ItemMedia({ className, variant, ...props }: ItemMediaProps) {
  return <div data-slot="item-media" className={cn(itemMediaStyles({ variant }), className)} {...props} />;
}
const ItemContent = ({ className, ...p }: React.ComponentPropsWithRef<'div'>) => <div className={cn(s.content(), className)} {...p} />;
const ItemTitle = ({ className, ...p }: React.ComponentPropsWithRef<'div'>) => <div className={cn(s.title(), className)} {...p} />;
const ItemDescription = ({ className, ...p }: React.ComponentPropsWithRef<'p'>) => <p className={cn(s.description(), className)} {...p} />;
const ItemActions = ({ className, ...p }: React.ComponentPropsWithRef<'div'>) => <div className={cn(s.actions(), className)} {...p} />;
const ItemHeader = ({ className, ...p }: React.ComponentPropsWithRef<'div'>) => <div className={cn(s.header(), className)} {...p} />;
const ItemFooter = ({ className, ...p }: React.ComponentPropsWithRef<'div'>) => <div className={cn(s.footer(), className)} {...p} />;

export interface ItemGroupProps extends React.ComponentPropsWithRef<'div'>, VariantProps<typeof itemGroupStyles> {}

/** A list of items. `framed` puts them in one card with hairlines between rows. */
export function ItemGroup({ className, framed, ...props }: ItemGroupProps) {
  return <div role="list" data-framed={framed || undefined} className={cn(itemGroupStyles({ framed }).root(), className)} {...props} />;
}

/** A hairline between rows of a group. */
export function ItemSeparator({ className, ...props }: React.ComponentPropsWithRef<'div'>) {
  return <div role="separator" className={cn(itemGroupStyles().separator(), className)} {...props} />;
}

export interface ItemProps extends Omit<ItemRootProps, 'title'> {
  /** An icon, shown on a tinted tile. */
  icon?: React.ReactNode;
  /** Any media (avatar, image) shown as is; wins over `icon`. */
  media?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Controls on the right: a button, a switch, a chip. */
  actions?: React.ReactNode;
  classNames?: { media?: string; content?: string; title?: string; description?: string; actions?: string };
}

/**
 * A list row: media, title and description, actions.
 *   <Item icon={<Shield />} title="God mode" description="No damage taken." actions={<Switch />} />
 * or compound: Item.Root / Media / Content / Title / Description / Actions / Header / Footer.
 */
function ItemSimple({ icon, media, title, description, actions, classNames, children, ...props }: ItemProps) {
  const simple = icon !== undefined || media !== undefined || title !== undefined || description !== undefined || actions !== undefined;
  if (!simple) return <ItemRoot {...props}>{children}</ItemRoot>;
  return (
    <ItemRoot {...props}>
      {media ? (
        <ItemMedia className={classNames?.media}>{media}</ItemMedia>
      ) : icon ? (
        <ItemMedia variant="icon" aria-hidden className={classNames?.media}>
          {icon}
        </ItemMedia>
      ) : null}
      <ItemContent className={classNames?.content}>
        {title && <ItemTitle className={classNames?.title}>{title}</ItemTitle>}
        {description && <ItemDescription className={classNames?.description}>{description}</ItemDescription>}
        {children}
      </ItemContent>
      {actions && <ItemActions className={classNames?.actions}>{actions}</ItemActions>}
    </ItemRoot>
  );
}

export const Item = Object.assign(ItemSimple, {
  Root: ItemRoot,
  Media: ItemMedia,
  Content: ItemContent,
  Title: ItemTitle,
  Description: ItemDescription,
  Actions: ItemActions,
  Header: ItemHeader,
  Footer: ItemFooter,
  Group: ItemGroup,
  Separator: ItemSeparator,
});
