import { Toast as BaseToast } from '@base-ui/react/toast';
import { CircleAlert, CircleCheck, Info, LoaderCircle, X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { buttonStyles } from '../button/button.styles';
import { Button } from '../button/button';
import { toastStyles } from './toast.styles';

const styles = toastStyles();

/** The app-wide toast queue; `toast()` adds to it, `<Toaster />` shows it. */
export const toastManager = BaseToast.createToastManager();

type AddOptions = Parameters<typeof toastManager.add>[0];
export type ToastType = 'success' | 'error' | 'info' | 'loading';
export type ToastOptions = Omit<AddOptions, 'title' | 'type'> & { type?: ToastType };

function show(title: React.ReactNode, options: ToastOptions = {}) {
  return toastManager.add({ title, ...options });
}

/**
 * Show a toast from anywhere:
 *   toast('Saved');  toast.success('Kit created', { description: '12 items' });
 *   toast.promise(save(), { loading: 'Saving…', success: 'Saved', error: 'Failed' });
 */
export const toast = Object.assign(show, {
  success: (title: React.ReactNode, options?: ToastOptions) => show(title, { ...options, type: 'success' }),
  error: (title: React.ReactNode, options?: ToastOptions) => show(title, { ...options, type: 'error' }),
  info: (title: React.ReactNode, options?: ToastOptions) => show(title, { ...options, type: 'info' }),
  promise: toastManager.promise,
  update: toastManager.update,
  close: toastManager.close,
});

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CircleCheck className={cn(styles.icon(), 'text-success')} />,
  error: <CircleAlert className={cn(styles.icon(), 'text-danger')} />,
  info: <Info className={cn(styles.icon(), 'text-accent-soft-foreground')} />,
  loading: <LoaderCircle className={cn(styles.icon(), 'animate-spin text-muted motion-reduce:animate-none')} />,
};

function ToastList({ classNames }: { classNames?: ToasterProps['classNames'] }) {
  const { toasts } = BaseToast.useToastManager();
  return toasts.map((t) => (
    <BaseToast.Root key={t.id} toast={t} swipeDirection={['down', 'right']} className={cn(styles.root(), classNames?.root)}>
      <BaseToast.Content className={styles.content()}>
        {t.type && ICONS[t.type as ToastType]}
        <div className={styles.text()}>
          <BaseToast.Title className={styles.title()} />
          <BaseToast.Description className={styles.description()} />
          {t.actionProps && (
            <BaseToast.Action className={cn(buttonStyles({ variant: 'outline', size: 'sm' }), styles.action())} />
          )}
        </div>
      </BaseToast.Content>
      <BaseToast.Close render={<Button variant="ghost" size="icon-sm" aria-label="Close" className={styles.close()} />}>
        <X />
      </BaseToast.Close>
    </BaseToast.Root>
  ));
}

export interface ToasterProps {
  /** Milliseconds a toast stays. @default 5000 */
  timeout?: number;
  /** Toasts shown at once. @default 3 */
  limit?: number;
  className?: string;
  classNames?: { viewport?: string; root?: string };
}

/** Mount once (e.g. in the root layout). Shows the toasts added with `toast()`. */
export function Toaster({ timeout = 5000, limit = 3, className, classNames }: ToasterProps) {
  return (
    <BaseToast.Provider toastManager={toastManager} timeout={timeout} limit={limit}>
      <BaseToast.Portal>
        <BaseToast.Viewport className={cn(styles.viewport(), classNames?.viewport, className)}>
          <ToastList classNames={classNames} />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}
