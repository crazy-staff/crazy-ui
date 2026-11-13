import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { Button } from '../button/button';
import { dialogStyles } from './dialog.styles';

const styles = dialogStyles();
type DivProps = React.ComponentPropsWithRef<'div'>;

export interface DialogContentProps
  extends React.ComponentPropsWithRef<typeof BaseDialog.Popup>,
    VariantProps<typeof dialogStyles> {
  /** Show the close button in the corner. @default true */
  showClose?: boolean;
  classNames?: { backdrop?: string; popup?: string };
}

function DialogContent({ size, showClose = true, className, classNames, children, ...props }: DialogContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={cn(styles.backdrop(), classNames?.backdrop)} />
      <BaseDialog.Popup className={cn(dialogStyles({ size }).popup(), classNames?.popup, className)} {...props}>
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

const DialogHeader = ({ className, ...props }: DivProps) => <div className={cn(styles.header(), className)} {...props} />;
const DialogBody = ({ className, ...props }: DivProps) => <div className={cn(styles.body(), className)} {...props} />;
const DialogFooter = ({ className, ...props }: DivProps) => <div className={cn(styles.footer(), className)} {...props} />;

function DialogTitle({ className, ...props }: React.ComponentPropsWithRef<typeof BaseDialog.Title>) {
  return <BaseDialog.Title className={cn(styles.title(), className)} {...props} />;
}
function DialogDescription({ className, ...props }: React.ComponentPropsWithRef<typeof BaseDialog.Description>) {
  return <BaseDialog.Description className={cn(styles.description(), className)} {...props} />;
}

export interface DialogProps extends Omit<React.ComponentProps<typeof BaseDialog.Root>, 'children'> {
  trigger?: React.ReactElement;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons at the bottom; wrap the closing ones in `Dialog.Close render={…}`. */
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

/**
 * A modal window.
 *   <Dialog trigger={<Button>Edit</Button>} title="Edit kit" footer={…}>…</Dialog>
 * or compound: Dialog.Root / Trigger / Content / Header / Title / Description / Body / Footer / Close.
 */
function DialogSimple({ trigger, title, description, footer, size, className, children, ...root }: DialogProps) {
  return (
    <BaseDialog.Root {...root}>
      {trigger && <BaseDialog.Trigger render={trigger} />}
      <DialogContent size={size} className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children && <DialogBody>{children}</DialogBody>}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </BaseDialog.Root>
  );
}

export const Dialog = Object.assign(DialogSimple, {
  Root: BaseDialog.Root,
  Trigger: BaseDialog.Trigger,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: BaseDialog.Close,
});
