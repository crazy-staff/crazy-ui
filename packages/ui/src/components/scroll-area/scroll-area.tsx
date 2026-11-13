import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { scrollAreaStyles } from './scroll-area.styles';

const s = scrollAreaStyles();

function Root({ className, ...p }: React.ComponentPropsWithRef<typeof BaseScrollArea.Root>) {
  return <BaseScrollArea.Root className={cn(s.root(), className)} {...p} />;
}
function Viewport({ className, ...p }: React.ComponentPropsWithRef<typeof BaseScrollArea.Viewport>) {
  return <BaseScrollArea.Viewport className={cn(s.viewport(), className)} {...p} />;
}
/** A thin scrollbar that shows on hover and while scrolling; includes its thumb. */
function Scrollbar({ className, ...p }: React.ComponentPropsWithRef<typeof BaseScrollArea.Scrollbar>) {
  return (
    <BaseScrollArea.Scrollbar className={cn(s.scrollbar(), className)} {...p}>
      <BaseScrollArea.Thumb className={s.thumb()} />
    </BaseScrollArea.Scrollbar>
  );
}

export interface ScrollAreaProps
  extends React.ComponentPropsWithRef<typeof BaseScrollArea.Root>,
    VariantProps<typeof scrollAreaStyles> {
  /** Which scrollbars to render. @default 'vertical' */
  orientation?: 'vertical' | 'horizontal' | 'both';
  classNames?: { viewport?: string; scrollbar?: string };
}

/** One-line form: `<ScrollArea className="h-64">…</ScrollArea>`. */
function ScrollAreaSimple({ orientation = 'vertical', fade, classNames, children, ...props }: ScrollAreaProps) {
  return (
    <Root {...props}>
      <BaseScrollArea.Viewport className={cn(scrollAreaStyles({ fade }).viewport(), classNames?.viewport)}>
        <BaseScrollArea.Content>{children}</BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      {orientation !== 'horizontal' && <Scrollbar orientation="vertical" className={classNames?.scrollbar} />}
      {orientation !== 'vertical' && <Scrollbar orientation="horizontal" className={classNames?.scrollbar} />}
      {orientation === 'both' && <BaseScrollArea.Corner className={s.corner()} />}
    </Root>
  );
}

export const ScrollArea = Object.assign(ScrollAreaSimple, {
  Root,
  Viewport,
  Content: BaseScrollArea.Content,
  Scrollbar,
  Corner: BaseScrollArea.Corner,
});
