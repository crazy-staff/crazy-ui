import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { alertStyles } from './alert.styles';

type Variant = NonNullable<VariantProps<typeof alertStyles>['variant']>;

const ICONS: Record<Variant, React.ComponentType<{ className?: string }>> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleAlert,
  neutral: Info,
};

export interface AlertProps extends Omit<React.ComponentPropsWithRef<'div'>, 'title'>, VariantProps<typeof alertStyles> {
  title?: React.ReactNode;
  /** Replace the variant's icon; `false` hides it. */
  icon?: React.ReactNode | false;
  classNames?: { icon?: string; body?: string; title?: string; description?: string };
}

/**
 * A callout. `danger` and `warning` use role="alert", the others role="status".
 * Compound parts: `Alert.Title`, `Alert.Description` (put them in `children` instead of `title`).
 */
function AlertRoot({ className, classNames, variant = 'info', title, icon, children, ...props }: AlertProps) {
  const s = alertStyles({ variant });
  const Icon = ICONS[variant];
  return (
    <div
      role={variant === 'danger' || variant === 'warning' ? 'alert' : 'status'}
      className={cn(s.root(), className)}
      {...props}
    >
      {icon === false ? null : icon ? (
        <span className={cn(s.icon(), classNames?.icon)}>{icon}</span>
      ) : (
        <Icon aria-hidden className={cn(s.icon(), classNames?.icon)} />
      )}
      <div className={cn(s.body(), classNames?.body)}>
        {title && <div className={cn(s.title(), classNames?.title)}>{title}</div>}
        {title ? <div className={cn(s.description(), classNames?.description)}>{children}</div> : children}
      </div>
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentPropsWithRef<'div'>) {
  return <div className={cn(alertStyles().title(), className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentPropsWithRef<'div'>) {
  return <div className={cn(alertStyles().description(), className)} {...props} />;
}

export const Alert = Object.assign(AlertRoot, { Title: AlertTitle, Description: AlertDescription });
