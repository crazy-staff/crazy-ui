import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { ChevronRight } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { collapsibleStyles } from './collapsible.styles';

const s = collapsibleStyles();

function CollapsibleRoot({ className, ...props }: React.ComponentPropsWithRef<typeof BaseCollapsible.Root>) {
  return <BaseCollapsible.Root className={cn(s.root(), className)} {...props} />;
}

export interface CollapsibleTriggerProps extends React.ComponentPropsWithRef<typeof BaseCollapsible.Trigger> {
  /** Show the rotating chevron before the label. @default true */
  chevron?: boolean;
}

function CollapsibleTrigger({ className, chevron = true, children, ...props }: CollapsibleTriggerProps) {
  return (
    <BaseCollapsible.Trigger className={cn(s.trigger(), className)} {...props}>
      {chevron && <ChevronRight aria-hidden className={s.chevron()} />}
      {children}
    </BaseCollapsible.Trigger>
  );
}

function CollapsiblePanel({ className, ...props }: React.ComponentPropsWithRef<typeof BaseCollapsible.Panel>) {
  return <BaseCollapsible.Panel className={cn(s.panel(), className)} {...props} />;
}

export interface CollapsibleProps extends Omit<React.ComponentPropsWithRef<typeof BaseCollapsible.Root>, 'title'> {
  title: React.ReactNode;
  classNames?: { trigger?: string; panel?: string };
}

/** One-line form: `<Collapsible title="Advanced">…</Collapsible>`. */
function CollapsibleSimple({ title, classNames, children, ...props }: CollapsibleProps) {
  return (
    <CollapsibleRoot {...props}>
      <CollapsibleTrigger className={classNames?.trigger}>{title}</CollapsibleTrigger>
      <CollapsiblePanel className={classNames?.panel}>{children}</CollapsiblePanel>
    </CollapsibleRoot>
  );
}

export const Collapsible = Object.assign(CollapsibleSimple, {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Panel: CollapsiblePanel,
});
