import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { Button } from '../button/button';
import { sheetStyles } from './sheet.styles';

const styles = sheetStyles();
type DivProps = React.ComponentPropsWithRef<'div'>;

export interface SheetContentProps
  extends React.ComponentPropsWithRef<typeof BaseDialog.Popup>,
    VariantProps<typeof sheetStyles> {
  /** @default true */
  showClose?: boolean;
  classNames?: { backdrop?: string; popup?: string };
}

function SheetContent({ side, showClose = true, className, classNames, children, ...props }: SheetContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={cn(styles.backdrop(), classNames?.backdrop)} />
      <BaseDialog.Popup className={cn(sheetStyles({ side }).popup(), classNames?.popup, className)} {...props}>
        {children}
        {showClose && (
          <BaseDialog.Close render={<Button variant="ghost" size="icon-sm" aria-label="Close" className={styles.close()} />}>
            <X />
          </BaseDialog.Close>
        )}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

const SheetHeader = ({ className, ...props }: DivProps) => <div className={cn(styles.header(), className)} {...props} />;
const SheetBody = ({ className, ...props }: DivProps) => <div className={cn(styles.body(), className)} {...props} />;
const SheetFooter = ({ className, ...props }: DivProps) => <div className={cn(styles.footer(), className)} {...props} />;

function SheetTitle({ className, ...props }: React.ComponentPropsWithRef<typeof BaseDialog.Title>) {
  return <BaseDialog.Title className={cn(styles.title(), className)} {...props} />;
}
function SheetDescription({ className, ...props }: React.ComponentPropsWithRef<typeof BaseDialog.Description>) {
  return <BaseDialog.Description className={cn(styles.description(), className)} {...props} />;
}

export interface SheetProps extends Omit<React.ComponentProps<typeof BaseDialog.Root>, 'children'> {
  trigger?: React.ReactElement;
  title: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  side?: 'right' | 'left' | 'top' | 'bottom';
  className?: string;
  children?: React.ReactNode;
}

/**
 * A side panel over the page (filters, settings, details).
 *   <Sheet trigger={<Button>Filters</Button>} title="Filters" side="right">…</Sheet>
 */
function SheetSimple({ trigger, title, description, footer, side, className, children, ...root }: SheetProps) {
  return (
    <BaseDialog.Root {...root}>
      {trigger && <BaseDialog.Trigger render={trigger} />}
      <SheetContent side={side} className={className}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {children && <SheetBody>{children}</SheetBody>}
        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </BaseDialog.Root>
  );
}

export const Sheet = Object.assign(SheetSimple, {
  Root: BaseDialog.Root,
  Trigger: BaseDialog.Trigger,
  Content: SheetContent,
  Header: SheetHeader,
  Title: SheetTitle,
  Description: SheetDescription,
  Body: SheetBody,
  Footer: SheetFooter,
  Close: BaseDialog.Close,
});
