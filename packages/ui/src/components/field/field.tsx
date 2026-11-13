import { Field as BaseField } from '@base-ui/react/field';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { inputStyles } from '../input/input.styles';
import { fieldStyles } from './field.styles';

const styles = fieldStyles();

function FieldRoot({ className, ...props }: React.ComponentPropsWithRef<typeof BaseField.Root>) {
  return <BaseField.Root className={cn(styles.root(), className as string)} {...props} />;
}
function FieldLabel({ className, ...props }: React.ComponentPropsWithRef<typeof BaseField.Label>) {
  return <BaseField.Label className={cn(styles.label(), className as string)} {...props} />;
}
function FieldControl({ className, ...props }: React.ComponentPropsWithRef<typeof BaseField.Control>) {
  return <BaseField.Control className={cn(inputStyles(), className as string)} {...props} />;
}
function FieldDescription({ className, ...props }: React.ComponentPropsWithRef<typeof BaseField.Description>) {
  return <BaseField.Description className={cn(styles.description(), className as string)} {...props} />;
}
function FieldError({ className, ...props }: React.ComponentPropsWithRef<typeof BaseField.Error>) {
  return <BaseField.Error className={cn(styles.error(), className as string)} {...props} />;
}

export interface FieldProps extends Omit<React.ComponentPropsWithRef<typeof BaseField.Root>, 'className'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** Shown when the control is invalid (or always, with `match={true}` via `errorMatch`). */
  error?: React.ReactNode;
  /** Passed to `Field.Error`'s `match` (e.g. `'valueMissing'`, or `true` to always show). */
  errorMatch?: React.ComponentProps<typeof BaseField.Error>['match'];
  className?: string;
  classNames?: { root?: string; label?: string; description?: string; error?: string };
  children?: React.ReactNode;
}

/**
 * A labelled form field. Short form: `<Field label="Name" description="…"><Field.Control /></Field>`.
 * Compound: `Field.Root`, `Field.Label`, `Field.Control`, `Field.Description`, `Field.Error`.
 */
function FieldSimple({ label, description, error, errorMatch, className, classNames, children, ...props }: FieldProps) {
  return (
    <FieldRoot className={cn(classNames?.root, className)} {...props}>
      {label && <FieldLabel className={classNames?.label}>{label}</FieldLabel>}
      {children}
      {description && <FieldDescription className={classNames?.description}>{description}</FieldDescription>}
      {error && (
        <FieldError className={classNames?.error} match={errorMatch}>
          {error}
        </FieldError>
      )}
    </FieldRoot>
  );
}

export const Field = Object.assign(FieldSimple, {
  Root: FieldRoot,
  Label: FieldLabel,
  Control: FieldControl,
  Description: FieldDescription,
  Error: FieldError,
});
