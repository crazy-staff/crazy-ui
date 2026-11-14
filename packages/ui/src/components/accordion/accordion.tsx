import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { accordionStyles } from './accordion.styles';

type Variant = 'card' | 'separated' | 'plain';
const VariantContext = React.createContext<Variant>('card');
const useStyles = () => accordionStyles({ variant: React.useContext(VariantContext) });

export interface AccordionRootProps extends React.ComponentPropsWithRef<typeof BaseAccordion.Root> {
  /** `card`: one framed card. `separated`: a card per item. `plain`: no frame. @default 'card' */
  variant?: Variant;
}

function AccordionRoot({ className, variant = 'card', ...props }: AccordionRootProps) {
  return (
    <VariantContext.Provider value={variant}>
      <BaseAccordion.Root className={cn(accordionStyles({ variant }).root(), className)} {...props} />
    </VariantContext.Provider>
  );
}

function AccordionItem({ className, ...props }: React.ComponentPropsWithRef<typeof BaseAccordion.Item>) {
  return <BaseAccordion.Item className={cn(useStyles().item(), className)} {...props} />;
}

export interface AccordionTriggerProps extends React.ComponentPropsWithRef<typeof BaseAccordion.Trigger> {
  classNames?: { header?: string; chevron?: string };
}

/** The clickable row; includes the heading wrapper and the chevron. */
function AccordionTrigger({ className, classNames, children, ...props }: AccordionTriggerProps) {
  const s = useStyles();
  return (
    <BaseAccordion.Header className={cn(s.header(), classNames?.header)}>
      <BaseAccordion.Trigger className={cn(s.trigger(), className)} {...props}>
        {children}
        <ChevronDown aria-hidden className={cn(s.chevron(), classNames?.chevron)} />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

export interface AccordionPanelProps extends React.ComponentPropsWithRef<typeof BaseAccordion.Panel> {
  classNames?: { content?: string };
}

function AccordionPanel({ className, classNames, children, ...props }: AccordionPanelProps) {
  const s = useStyles();
  return (
    <BaseAccordion.Panel className={cn(s.panel(), className)} {...props}>
      <div className={cn(s.content(), classNames?.content)}>{children}</div>
    </BaseAccordion.Panel>
  );
}

export interface AccordionItemData {
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps extends Omit<AccordionRootProps, 'children'> {
  items: AccordionItemData[];
}

/** One-line form: `<Accordion items={[{ value, title, content }]} />`. */
function AccordionSimple({ items, ...props }: AccordionProps) {
  return (
    <AccordionRoot {...props}>
      {items.map((i) => (
        <AccordionItem key={i.value} value={i.value} disabled={i.disabled}>
          <AccordionTrigger>{i.title}</AccordionTrigger>
          <AccordionPanel>{i.content}</AccordionPanel>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}

export const Accordion = Object.assign(AccordionSimple, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Panel: AccordionPanel,
});
