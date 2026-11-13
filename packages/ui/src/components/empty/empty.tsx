import * as React from 'react';
import { cn } from '../../lib/tv';
import { emptyStyles } from './empty.styles';

const s = emptyStyles();
type Div = React.ComponentPropsWithRef<'div'>;

const EmptyRoot = ({ className, ...p }: Div) => <div className={cn(s.root(), className)} {...p} />;
const EmptyIcon = ({ className, ...p }: Div) => <div aria-hidden className={cn(s.icon(), className)} {...p} />;
const EmptyTitle = ({ className, ...p }: React.ComponentPropsWithRef<'h3'>) => <h3 className={cn(s.title(), className)} {...p} />;
const EmptyDescription = ({ className, ...p }: React.ComponentPropsWithRef<'p'>) => (
  <p className={cn(s.description(), className)} {...p} />
);
const EmptyActions = ({ className, ...p }: Div) => <div className={cn(s.actions(), className)} {...p} />;

export interface EmptyProps extends Omit<Div, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons under the text. */
  action?: React.ReactNode;
  classNames?: { icon?: string; title?: string; description?: string; actions?: string };
}

/** An empty state: icon tile, title, a line of text and an action. */
function EmptySimple({ icon, title, description, action, classNames, children, ...props }: EmptyProps) {
  return (
    <EmptyRoot {...props}>
      {icon && <EmptyIcon className={classNames?.icon}>{icon}</EmptyIcon>}
      <EmptyTitle className={classNames?.title}>{title}</EmptyTitle>
      {description && <EmptyDescription className={classNames?.description}>{description}</EmptyDescription>}
      {children}
      {action && <EmptyActions className={classNames?.actions}>{action}</EmptyActions>}
    </EmptyRoot>
  );
}

export const Empty = Object.assign(EmptySimple, {
  Root: EmptyRoot,
  Icon: EmptyIcon,
  Title: EmptyTitle,
  Description: EmptyDescription,
  Actions: EmptyActions,
});
