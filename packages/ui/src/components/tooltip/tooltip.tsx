import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { tooltipStyles } from './tooltip.styles';

const styles = tooltipStyles();

type Side = 'top' | 'right' | 'bottom' | 'left' | 'inline-start' | 'inline-end';
type Align = 'start' | 'center' | 'end';

export interface TooltipContentProps extends React.ComponentPropsWithRef<typeof BaseTooltip.Popup> {
  /** Which side of the trigger the tooltip appears on. @default 'top' */
  side?: Side;
  /** How the tooltip lines up with the trigger along that side. @default 'center' */
  align?: Align;
  /** Gap between trigger and tooltip, in px. @default 8 */
  sideOffset?: number;
  classNames?: { positioner?: string; popup?: string };
}

function TooltipContent({
  side = 'top',
  align = 'center',
  sideOffset = 8,
  className,
  classNames,
  ...props
}: TooltipContentProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(styles.positioner(), classNames?.positioner)}
      >
        <BaseTooltip.Popup className={cn(styles.popup(), classNames?.popup, className)} {...props} />
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}

export interface TooltipProps extends Omit<React.ComponentProps<typeof BaseTooltip.Root>, 'children'> {
  /** The hint text. */
  content: React.ReactNode;
  /** The element that shows the tooltip on hover and focus. */
  children: React.ReactElement;
  side?: Side;
  align?: Align;
  /** Milliseconds before it opens. @default 400 */
  delay?: number;
  /** Milliseconds before it closes once the pointer leaves. @default 0 */
  closeDelay?: number;
  className?: string;
  classNames?: { positioner?: string; popup?: string };
}

/**
 * A short hint on hover or focus.
 *   <Tooltip content="Copy"><Button size="icon">…</Button></Tooltip>
 * Wrap a group in `Tooltip.Provider` so neighbouring tooltips open instantly one after another.
 */
function TooltipSimple({
  content,
  children,
  side,
  align,
  delay = 400,
  closeDelay,
  className,
  classNames,
  ...root
}: TooltipProps) {
  return (
    <BaseTooltip.Root {...root}>
      <BaseTooltip.Trigger delay={delay} closeDelay={closeDelay} render={children} />
      <TooltipContent side={side} align={align} className={className} classNames={classNames}>
        {content}
      </TooltipContent>
    </BaseTooltip.Root>
  );
}

export const Tooltip = Object.assign(TooltipSimple, {
  Provider: BaseTooltip.Provider,
  Root: BaseTooltip.Root,
  Trigger: BaseTooltip.Trigger,
  Content: TooltipContent,
});
