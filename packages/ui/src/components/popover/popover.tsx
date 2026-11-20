import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { X } from 'lucide-react';
import * as React from 'react';
import { type MobileMode, useDrawerMode } from '../../lib/responsive';
import { cn } from '../../lib/tv';
import { Button } from '../button/button';
import { Drawer } from '../drawer/drawer';
import { popoverStyles } from './popover.styles';

const styles = popoverStyles();

/** Set by `Popover.Root` on a phone: the parts render a bottom drawer instead (guidelines → Mobile). */
const DrawerModeContext = React.createContext(false);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = any;

export interface PopoverRootProps extends React.ComponentProps<typeof BasePopover.Root> {
  /** On a phone (below `sm`) open as a bottom drawer (`'drawer'`, the default) or keep the popover (`'none'`). */
  mobile?: MobileMode;
}

function PopoverRoot({ mobile = 'drawer', children, ...props }: PopoverRootProps) {
  const drawer = useDrawerMode(mobile);
  if (!drawer) return <BasePopover.Root {...props}>{children}</BasePopover.Root>;
  const { open, defaultOpen, onOpenChange, onOpenChangeComplete, actionsRef } = props as AnyProps;
  return (
    <BaseDrawer.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      actionsRef={actionsRef}
    >
      <DrawerModeContext.Provider value>{children as React.ReactNode}</DrawerModeContext.Provider>
    </BaseDrawer.Root>
  );
}

function PopoverTrigger(props: React.ComponentPropsWithRef<typeof BasePopover.Trigger>) {
  const drawer = React.useContext(DrawerModeContext);
  if (drawer) {
    const { openOnHover: _h, delay: _d, closeDelay: _c, handle: _x, payload: _p, ...rest } = props as AnyProps;
    return <BaseDrawer.Trigger {...rest} />;
  }
  return <BasePopover.Trigger {...props} />;
}

function PopoverClose(props: React.ComponentPropsWithRef<typeof BasePopover.Close>) {
  const drawer = React.useContext(DrawerModeContext);
  if (drawer) return <BaseDrawer.Close {...(props as AnyProps)} />;
  return <BasePopover.Close {...props} />;
}

type Side = 'top' | 'right' | 'bottom' | 'left' | 'inline-start' | 'inline-end';
type Align = 'start' | 'center' | 'end';

export interface PopoverContentProps extends React.ComponentPropsWithRef<typeof BasePopover.Popup> {
  side?: Side;
  align?: Align;
  sideOffset?: number;
  /** Show a small close button in the corner. @default false */
  showClose?: boolean;
  classNames?: { positioner?: string; popup?: string; drawer?: string };
}

function PopoverContent({
  side = 'bottom',
  align = 'center',
  sideOffset = 8,
  showClose = false,
  className,
  classNames,
  children,
  ...props
}: PopoverContentProps) {
  const drawer = React.useContext(DrawerModeContext);
  if (drawer) {
    const { initialFocus, finalFocus, 'aria-label': label, style } = props as AnyProps;
    // the same content in a bottom drawer, with its controls at touch size
    return (
      <Drawer.Content touch initialFocus={initialFocus} finalFocus={finalFocus} aria-label={label} style={style}>
        <div className={cn(styles.drawerBody(), classNames?.drawer)}>{children}</div>
      </Drawer.Content>
    );
  }
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(styles.positioner(), classNames?.positioner)}
      >
        <BasePopover.Popup className={cn(styles.popup(), showClose && 'pe-11', classNames?.popup, className)} {...props}>
          {children}
          {showClose && (
            <BasePopover.Close
              render={<Button variant="ghost" size="icon-sm" aria-label="Close" className={styles.close()} />}
            >
              <X />
            </BasePopover.Close>
          )}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

function PopoverTitle({ className, ...props }: React.ComponentPropsWithRef<typeof BasePopover.Title>) {
  const drawer = React.useContext(DrawerModeContext);
  if (drawer) return <Drawer.Title {...(props as AnyProps)} />;
  return <BasePopover.Title className={cn(styles.title(), className)} {...props} />;
}

function PopoverDescription({ className, ...props }: React.ComponentPropsWithRef<typeof BasePopover.Description>) {
  const drawer = React.useContext(DrawerModeContext);
  if (drawer) return <Drawer.Description {...(props as AnyProps)} />;
  return <BasePopover.Description className={cn(styles.description(), className)} {...props} />;
}

export interface PopoverProps extends Omit<PopoverRootProps, 'children'> {
  /** The element that opens the popover (a Button, a link …). */
  trigger: React.ReactElement;
  title?: React.ReactNode;
  description?: React.ReactNode;
  side?: Side;
  align?: Align;
  /** Show a small close button in the corner. @default false */
  showClose?: boolean;
  className?: string;
  classNames?: { positioner?: string; popup?: string; drawer?: string };
  children?: React.ReactNode;
}

/**
 * Floating content anchored to a trigger; on a phone (below `sm`) the same content in a bottom drawer,
 * titled by `title` (set `mobile="none"` to keep the popover).
 *   <Popover trigger={<Button>Open</Button>} title="Filters">…</Popover>
 * or compound: Popover.Root / Trigger / Content / Title / Description / Close.
 */
function PopoverSimple({
  trigger,
  title,
  description,
  side,
  align,
  showClose,
  className,
  classNames,
  children,
  ...root
}: PopoverProps) {
  return (
    <PopoverRoot {...root}>
      <PopoverTrigger render={trigger} />
      <PopoverContent side={side} align={align} showClose={showClose} className={className} classNames={classNames}>
        {title && <PopoverTitle>{title}</PopoverTitle>}
        {description && <PopoverDescription>{description}</PopoverDescription>}
        {children}
      </PopoverContent>
    </PopoverRoot>
  );
}

export const Popover = Object.assign(PopoverSimple, {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Title: PopoverTitle,
  Description: PopoverDescription,
  Close: PopoverClose,
});
