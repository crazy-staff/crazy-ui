import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { tooltipStyles } from './tooltip.styles';

const styles = tooltipStyles();

type Side = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipContentProps extends React.ComponentPropsWithRef<typeof BaseTooltip.Popup> {
  side?: Side;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  classNames?: { positioner?: string; popup?: string };
}

function TooltipContent({ side = 'top', align = 'center', sideOffset = 6, className, classNames, ...props }: TooltipContentProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner side={side} align={align} sideOffset={sideOffset} className={cn(styles.positioner(), classNames?.positioner)}>
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
  /** Milliseconds before it opens. @default 400 */
  delay?: number;
  className?: string;
}

/**
 * A short hint on hover or focus.
 *   <Tooltip content="Copy"><Button size="icon">…</Button></Tooltip>
 * Wrap a group in `Tooltip.Provider` so neighbouring tooltips open instantly one after another.
 */
function TooltipSimple({ content, children, side, delay = 400, className, ...root }: TooltipProps) {
  return (
    <BaseTooltip.Root {...root}>
      <BaseTooltip.Trigger delay={delay} render={children} />
      <TooltipContent side={side} className={className}>
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
