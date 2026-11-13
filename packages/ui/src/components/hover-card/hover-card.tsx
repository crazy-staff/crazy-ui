import { PreviewCard } from '@base-ui/react/preview-card';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { hoverCardStyles } from './hover-card.styles';

const styles = hoverCardStyles();

export interface HoverCardContentProps extends React.ComponentPropsWithRef<typeof PreviewCard.Popup> {
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  classNames?: { positioner?: string; popup?: string };
}

function HoverCardContent({ side = 'bottom', align = 'center', sideOffset = 8, className, classNames, ...props }: HoverCardContentProps) {
  return (
    <PreviewCard.Portal>
      <PreviewCard.Positioner side={side} align={align} sideOffset={sideOffset} className={cn(styles.positioner(), classNames?.positioner)}>
        <PreviewCard.Popup className={cn(styles.popup(), classNames?.popup, className)} {...props} />
      </PreviewCard.Positioner>
    </PreviewCard.Portal>
  );
}

export interface HoverCardProps extends Omit<React.ComponentProps<typeof PreviewCard.Root>, 'children'> {
  /** Usually a link (`<a href>`); the card opens while it's hovered or focused. */
  trigger: React.ReactElement;
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Milliseconds before it opens. @default 500 */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * A preview card on hover — a user, a linked docs page, a feature.
 *   <HoverCard trigger={<a href="/u/dawid">@dawid</a>}>…</HoverCard>
 */
function HoverCardSimple({ trigger, side, delay = 500, className, children, ...root }: HoverCardProps) {
  return (
    <PreviewCard.Root {...root}>
      <PreviewCard.Trigger delay={delay} render={trigger} />
      <HoverCardContent side={side} className={className}>
        {children}
      </HoverCardContent>
    </PreviewCard.Root>
  );
}

export const HoverCard = Object.assign(HoverCardSimple, {
  Root: PreviewCard.Root,
  Trigger: PreviewCard.Trigger,
  Content: HoverCardContent,
});
