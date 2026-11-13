import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { Button } from '../button/button';
import { alertDialogStyles } from './alert-dialog.styles';

const styles = alertDialogStyles();
type DivProps = React.ComponentPropsWithRef<'div'>;

export interface AlertDialogContentProps
  extends React.ComponentPropsWithRef<typeof BaseAlertDialog.Popup>,
    VariantProps<typeof alertDialogStyles> {
  classNames?: { backdrop?: string; popup?: string };
}

function AlertDialogContent({ size, className, classNames, ...props }: AlertDialogContentProps) {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop className={cn(styles.backdrop(), classNames?.backdrop)} />
      <BaseAlertDialog.Popup className={cn(alertDialogStyles({ size }).popup(), classNames?.popup, className)} {...props} />
    </BaseAlertDialog.Portal>
  );
}

const AlertDialogHeader = ({ className, ...props }: DivProps) => <div className={cn(styles.header(), className)} {...props} />;
const AlertDialogFooter = ({ className, ...props }: DivProps) => <div className={cn(styles.footer(), className)} {...props} />;

function AlertDialogTitle({ className, ...props }: React.ComponentPropsWithRef<typeof BaseAlertDialog.Title>) {
  return <BaseAlertDialog.Title className={cn(styles.title(), className)} {...props} />;
}
function AlertDialogDescription({ className, ...props }: React.ComponentPropsWithRef<typeof BaseAlertDialog.Description>) {
  return <BaseAlertDialog.Description className={cn(styles.description(), className)} {...props} />;
}

export interface AlertDialogProps extends Omit<React.ComponentProps<typeof BaseAlertDialog.Root>, 'children'> {
  trigger?: React.ReactElement;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** @default 'Cancel' */
  cancelLabel?: React.ReactNode;
  /** @default 'Continue' */
  actionLabel?: React.ReactNode;
  onAction?: () => void;
  /** `danger` paints the action red (delete, reset …). @default 'default' */
  tone?: 'default' | 'danger';
  className?: string;
}

/**
 * A modal that asks to confirm an action. Clicking outside doesn't dismiss it.
 *   <AlertDialog trigger={<Button variant="danger">Delete</Button>} title="Delete kit?" tone="danger" onAction={…} />
 */
function AlertDialogSimple({
  trigger,
  title,
  description,
  cancelLabel = 'Cancel',
  actionLabel = 'Continue',
  onAction,
  tone = 'default',
  className,
  ...root
}: AlertDialogProps) {
  return (
    <BaseAlertDialog.Root {...root}>
      {trigger && <BaseAlertDialog.Trigger render={trigger} />}
      <AlertDialogContent className={className}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <BaseAlertDialog.Close render={<Button variant="outline" />}>{cancelLabel}</BaseAlertDialog.Close>
          <BaseAlertDialog.Close render={<Button variant={tone === 'danger' ? 'danger' : 'solid'} onClick={onAction} />}>
            {actionLabel}
          </BaseAlertDialog.Close>
        </AlertDialogFooter>
      </AlertDialogContent>
    </BaseAlertDialog.Root>
  );
}

export const AlertDialog = Object.assign(AlertDialogSimple, {
  Root: BaseAlertDialog.Root,
  Trigger: BaseAlertDialog.Trigger,
  Content: AlertDialogContent,
  Header: AlertDialogHeader,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Footer: AlertDialogFooter,
  Close: BaseAlertDialog.Close,
});
