import { NavigationMenu as BaseNav } from '@base-ui/react/navigation-menu';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { navigationMenuStyles } from './navigation-menu.styles';

const styles = navigationMenuStyles();
type Props<C extends React.ElementType> = Omit<React.ComponentPropsWithRef<C>, 'className'> & { className?: string };

function NavigationMenuRoot({ className, ...props }: Props<typeof BaseNav.Root>) {
  return <BaseNav.Root className={cn(styles.root(), className)} {...props} />;
}

/** The row of triggers and links, with a highlight that glides to the hovered or open item. */
function NavigationMenuList({
  className,
  classNames,
  children,
  ...props
}: Props<typeof BaseNav.List> & { classNames?: { indicator?: string } }) {
  const ref = React.useRef<HTMLUListElement>(null);
  const [box, setBox] = React.useState<{ left: number; width: number; shown: boolean; instant: boolean }>({
    left: 0,
    width: 0,
    shown: false,
    instant: true,
  });

  const moveTo = (el: Element | null | undefined) => {
    const list = ref.current;
    const item = el?.closest('[data-nav-target]') as HTMLElement | null;
    if (!list || !item || !list.contains(item)) {
      // stay on the open trigger, otherwise fade out where it is
      const open = list?.querySelector<HTMLElement>('[data-nav-target][data-popup-open]');
      if (open && open !== el) return moveTo(open);
      setBox((b) => ({ ...b, shown: false }));
      return;
    }
    setBox((b) => ({ left: item.offsetLeft, width: item.offsetWidth, shown: true, instant: !b.shown }));
  };

  return (
    <BaseNav.List
      ref={ref}
      className={cn(styles.list(), className)}
      onPointerOver={(e) => moveTo(e.target as Element)}
      onPointerLeave={() => moveTo(null)}
      onFocus={(e) => moveTo(e.target as Element)}
      onBlur={() => moveTo(null)}
      {...props}
    >
      {children}
      <li
        aria-hidden
        role="presentation"
        data-hidden={!box.shown || undefined}
        data-instant={box.instant || undefined}
        className={cn(styles.indicator(), classNames?.indicator)}
        style={{ '--nav-indicator-left': `${box.left}px`, '--nav-indicator-width': `${box.width}px` } as React.CSSProperties}
      />
    </BaseNav.List>
  );
}

function NavigationMenuItem(props: React.ComponentPropsWithRef<typeof BaseNav.Item>) {
  return <BaseNav.Item {...props} />;
}

/** Opens the item's panel. A chevron is added after the label. */
function NavigationMenuTrigger({ className, children, ...props }: Props<typeof BaseNav.Trigger>) {
  return (
    <BaseNav.Trigger data-nav-target="" className={cn(styles.trigger(), className)} {...props}>
      {children}
      <BaseNav.Icon className={styles.icon()}>
        <ChevronDown />
      </BaseNav.Icon>
    </BaseNav.Trigger>
  );
}

/** The panel of an item. It slides in from the side the pointer came from. */
function NavigationMenuContent({ className, ...props }: Props<typeof BaseNav.Content>) {
  return <BaseNav.Content className={cn(styles.content(), className)} {...props} />;
}

/** A link. Top-level links look like triggers; pass `render` to use your router's link. */
function NavigationMenuLink({ className, ...props }: Props<typeof BaseNav.Link>) {
  return <BaseNav.Link data-nav-target="" className={cn(styles.trigger(), className)} {...props} />;
}

export interface NavigationMenuLinkCardProps extends Omit<Props<typeof BaseNav.Link>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

/** A link inside a panel: icon, title and a line of description. */
function NavigationMenuLinkCard({ title, description, icon, className, ...props }: NavigationMenuLinkCardProps) {
  return (
    <BaseNav.Link className={cn(styles.card(), className)} {...props}>
      {icon && <span className={styles.cardIcon()}>{icon}</span>}
      <span className="min-w-0">
        <span className={cn(styles.cardTitle(), 'block')}>{title}</span>
        {description && <span className={cn(styles.cardDescription(), 'block')}>{description}</span>}
      </span>
    </BaseNav.Link>
  );
}

/** The floating box the panels render in; it resizes smoothly between panels. */
function NavigationMenuViewport({
  className,
  classNames,
  sideOffset = 8,
  align = 'start',
}: {
  className?: string;
  classNames?: { positioner?: string; popup?: string; viewport?: string };
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
}) {
  return (
    <BaseNav.Portal>
      <BaseNav.Positioner
        sideOffset={sideOffset}
        align={align}
        collisionPadding={16}
        collisionAvoidance={{ side: 'none' }}
        className={cn(styles.positioner(), classNames?.positioner)}
      >
        <BaseNav.Popup className={cn(styles.popup(), classNames?.popup, className)}>
          <BaseNav.Viewport className={cn(styles.viewport(), classNames?.viewport)} />
        </BaseNav.Popup>
      </BaseNav.Positioner>
    </BaseNav.Portal>
  );
}

/* ------------------------------------------------------------------------------------------ */

export interface NavigationMenuLinkData {
  title: React.ReactNode;
  href: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

export type NavigationMenuItemData =
  | { label: React.ReactNode; href: string; active?: boolean }
  | { label: React.ReactNode; links: NavigationMenuLinkData[]; columns?: 1 | 2 }
  | { label: React.ReactNode; content: React.ReactNode };

export interface NavigationMenuProps extends Omit<Props<typeof BaseNav.Root>, 'children'> {
  items: NavigationMenuItemData[];
  classNames?: { list?: string; trigger?: string; content?: string; popup?: string };
}

/**
 * Site navigation with panels, like the top bar of a docs site.
 *   <NavigationMenu items={[{ label: 'Docs', links: [{ title: 'Install', href: '/docs/install' }] }, { label: 'Blog', href: '/blog' }]} />
 * Compound: NavigationMenu.Root / List / Item / Trigger / Content / Link / LinkCard / Viewport.
 */
function NavigationMenuSimple({ items, className, classNames, ...props }: NavigationMenuProps) {
  return (
    <NavigationMenuRoot className={className} {...props}>
      <NavigationMenuList className={classNames?.list}>
        {items.map((item, i) => (
          <NavigationMenuItem key={i}>
            {'href' in item ? (
              <NavigationMenuLink href={item.href} active={item.active} className={classNames?.trigger}>
                {item.label}
              </NavigationMenuLink>
            ) : (
              <>
                <NavigationMenuTrigger className={classNames?.trigger}>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent className={classNames?.content}>
                  {'links' in item ? (
                    <ul className={cn(styles.cardList(), item.columns === 1 && 'sm:w-80 sm:grid-cols-1')}>
                      {item.links.map((l) => (
                        <li key={l.href}>
                          <NavigationMenuLinkCard href={l.href} title={l.title} description={l.description} icon={l.icon} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    item.content
                  )}
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <NavigationMenuViewport classNames={{ popup: classNames?.popup }} />
    </NavigationMenuRoot>
  );
}

export const NavigationMenu = Object.assign(NavigationMenuSimple, {
  Root: NavigationMenuRoot,
  List: NavigationMenuList,
  Item: NavigationMenuItem,
  Trigger: NavigationMenuTrigger,
  Content: NavigationMenuContent,
  Link: NavigationMenuLink,
  LinkCard: NavigationMenuLinkCard,
  Viewport: NavigationMenuViewport,
});
