import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { drawerStyles } from './drawer.styles';

const styles = drawerStyles();

export interface DrawerContentProps extends React.ComponentPropsWithRef<typeof BaseDrawer.Popup> {
  /** Show the grab handle at the top. @default true */
  showHandle?: boolean;
  classNames?: { backdrop?: string; viewport?: string; popup?: string; content?: string };
}

function DrawerContent({ showHandle = true, className, classNames, children, ...props }: DrawerContentProps) {
  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop className={cn(styles.backdrop(), classNames?.backdrop)} />
      <BaseDrawer.Viewport className={cn(styles.viewport(), classNames?.viewport)}>
        <BaseDrawer.Popup className={cn(styles.popup(), classNames?.popup, className)} {...props}>
          {showHandle && <div aria-hidden className={styles.handle()} />}
          <BaseDrawer.Content className={cn(styles.content(), classNames?.content)}>{children}</BaseDrawer.Content>
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  );
}

function DrawerTitle({ className, ...props }: React.ComponentPropsWithRef<typeof BaseDrawer.Title>) {
  return <BaseDrawer.Title className={cn(styles.title(), className)} {...props} />;
}
function DrawerDescription({ className, ...props }: React.ComponentPropsWithRef<typeof BaseDrawer.Description>) {
  return <BaseDrawer.Description className={cn(styles.description(), className)} {...props} />;
}
const DrawerFooter = ({ className, ...props }: React.ComponentPropsWithRef<'div'>) => (
  <div className={cn(styles.footer(), className)} {...props} />
);

export interface DrawerProps extends Omit<React.ComponentProps<typeof BaseDrawer.Root>, 'children'> {
  trigger?: React.ReactElement;
  title: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

/**
 * A panel that slides up from the bottom and closes with a swipe down.
 *   <Drawer trigger={<Button>Details</Button>} title="Kit details">…</Drawer>
 */
function DrawerSimple({ trigger, title, description, footer, className, children, ...root }: DrawerProps) {
  return (
    <BaseDrawer.Root {...root}>
      {trigger && <BaseDrawer.Trigger render={trigger} />}
      <DrawerContent className={className}>
        <DrawerTitle>{title}</DrawerTitle>
        {description && <DrawerDescription>{description}</DrawerDescription>}
        {children && <div className="mt-4 text-sm">{children}</div>}
        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </BaseDrawer.Root>
  );
}

export const Drawer = Object.assign(DrawerSimple, {
  Root: BaseDrawer.Root,
  Trigger: BaseDrawer.Trigger,
  Content: DrawerContent,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Footer: DrawerFooter,
  Close: BaseDrawer.Close,
});
