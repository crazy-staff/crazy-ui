import { Popover as BasePopover } from '@base-ui/react/popover';
import { X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { Button } from '../button/button';
import { popoverStyles } from './popover.styles';

const styles = popoverStyles();

type Side = 'top' | 'right' | 'bottom' | 'left' | 'inline-start' | 'inline-end';
type Align = 'start' | 'center' | 'end';

export interface PopoverContentProps extends React.ComponentPropsWithRef<typeof BasePopover.Popup> {
  side?: Side;
  align?: Align;
  sideOffset?: number;
  /** Show a small close button in the corner. @default false */
  showClose?: boolean;
  classNames?: { positioner?: string; popup?: string };
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
  return <BasePopover.Title className={cn(styles.title(), className)} {...props} />;
}

function PopoverDescription({ className, ...props }: React.ComponentPropsWithRef<typeof BasePopover.Description>) {
  return <BasePopover.Description className={cn(styles.description(), className)} {...props} />;
}

export interface PopoverProps extends Omit<React.ComponentProps<typeof BasePopover.Root>, 'children'> {
  /** The element that opens the popover (a Button, a link …). */
  trigger: React.ReactElement;
  title?: React.ReactNode;
  description?: React.ReactNode;
  side?: Side;
  align?: Align;
  /** Show a small close button in the corner. @default false */
  showClose?: boolean;
  className?: string;
  classNames?: { positioner?: string; popup?: string };
  children?: React.ReactNode;
}

/**
 * Floating content anchored to a trigger.
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
    <BasePopover.Root {...root}>
      <BasePopover.Trigger render={trigger} />
      <PopoverContent side={side} align={align} showClose={showClose} className={className} classNames={classNames}>
        {title && <PopoverTitle>{title}</PopoverTitle>}
        {description && <PopoverDescription>{description}</PopoverDescription>}
        {children}
      </PopoverContent>
    </BasePopover.Root>
  );
}

export const Popover = Object.assign(PopoverSimple, {
  Root: BasePopover.Root,
  Trigger: BasePopover.Trigger,
  Content: PopoverContent,
  Title: PopoverTitle,
  Description: PopoverDescription,
  Close: BasePopover.Close,
});
