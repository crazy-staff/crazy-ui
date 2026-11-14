import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { ChevronsLeftRight, Minus, Plus } from 'lucide-react';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { numberFieldStyles } from './number-field.styles';

type Size = VariantProps<typeof numberFieldStyles>['size'];
type Slots = keyof ReturnType<typeof numberFieldStyles>;
const SizeContext = React.createContext<Size>('md');

type PartProps<T extends React.ElementType> = Omit<React.ComponentPropsWithRef<T>, 'className'> & { className?: string };

export interface NumberFieldRootProps extends PartProps<typeof BaseNumberField.Root>, VariantProps<typeof numberFieldStyles> {}

function NumberFieldRoot({ size, className, ...props }: NumberFieldRootProps) {
  return (
    <SizeContext value={size}>
      <BaseNumberField.Root className={cn(numberFieldStyles().root(), className)} {...props} />
    </SizeContext>
  );
}

/** The bordered box around the steppers and the input. */
function NumberFieldGroup({ className, ...props }: PartProps<typeof BaseNumberField.Group>) {
  const size = React.useContext(SizeContext);
  return <BaseNumberField.Group className={cn(numberFieldStyles({ size }).group(), className)} {...props} />;
}

/** The text input (`inputmode="decimal"`), formatted with the field's locale. */
function NumberFieldInput({ className, ...props }: PartProps<typeof BaseNumberField.Input>) {
  return <BaseNumberField.Input className={cn(numberFieldStyles().input(), className)} {...props} />;
}

/** The minus button. Children replace the icon. */
function NumberFieldDecrement({ className, children, ...props }: PartProps<typeof BaseNumberField.Decrement>) {
  const size = React.useContext(SizeContext);
  return (
    <BaseNumberField.Decrement className={cn(numberFieldStyles({ size }).button(), className)} {...props}>
      {children ?? <Minus aria-hidden />}
    </BaseNumberField.Decrement>
  );
}

/** The plus button. Children replace the icon. */
function NumberFieldIncrement({ className, children, ...props }: PartProps<typeof BaseNumberField.Increment>) {
  const size = React.useContext(SizeContext);
  return (
    <BaseNumberField.Increment className={cn(numberFieldStyles({ size }).button(), className)} {...props}>
      {children ?? <Plus aria-hidden />}
    </BaseNumberField.Increment>
  );
}

/** Drag horizontally over its children to change the value. Put a label or an icon inside. */
function NumberFieldScrubArea({ className, ...props }: PartProps<typeof BaseNumberField.ScrubArea>) {
  return <BaseNumberField.ScrubArea className={cn(numberFieldStyles().scrubArea(), className)} {...props} />;
}

/** The cursor shown while scrubbing (the real pointer is locked and hidden). */
function NumberFieldScrubAreaCursor({ className, children, ...props }: PartProps<typeof BaseNumberField.ScrubAreaCursor>) {
  return (
    <BaseNumberField.ScrubAreaCursor className={cn(numberFieldStyles().scrubCursor(), className)} {...props}>
      {children ?? <ChevronsLeftRight aria-hidden />}
    </BaseNumberField.ScrubAreaCursor>
  );
}

export interface NumberFieldProps extends NumberFieldRootProps {
  /** A label above the field. With `scrub`, dragging it changes the value. */
  label?: React.ReactNode;
  /**
   * Change the value by dragging horizontally: over the `label` if there is one, otherwise over a
   * small handle at the start of the field. @default false
   */
  scrub?: boolean;
  /** Shown while the field is empty. */
  placeholder?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  /** Hide the minus and plus buttons (arrow keys and the wheel still step). @default false */
  hideButtons?: boolean;
  classNames?: Partial<Record<Slots, string>>;
}

/**
 * A field for numbers with our own minus and plus buttons (no native spinners).
 *   <NumberField aria-label="Ore" defaultValue={50} min={0} max={999} />
 * Arrow keys step by `step`, Shift by `largeStep`, Alt by `smallStep`.
 * Compound: NumberField.Root / Group / Decrement / Input / Increment / ScrubArea / ScrubAreaCursor.
 */
function NumberFieldSimple({
  label,
  scrub = false,
  placeholder,
  hideButtons = false,
  size,
  className,
  classNames,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...props
}: NumberFieldProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const styles = numberFieldStyles({ size });
  const labelEl = label ? (
    <label htmlFor={inputId} className={cn(styles.label(), classNames?.label)}>
      {label}
    </label>
  ) : null;
  const cursor = <NumberFieldScrubAreaCursor className={classNames?.scrubCursor} />;

  return (
    <NumberFieldRoot id={label ? inputId : id} size={size} className={cn(classNames?.root, className)} {...props}>
      {labelEl &&
        (scrub ? (
          <NumberFieldScrubArea className={classNames?.scrubArea}>
            {labelEl}
            {cursor}
          </NumberFieldScrubArea>
        ) : (
          labelEl
        ))}
      <NumberFieldGroup className={classNames?.group}>
        {scrub && !labelEl && (
          <NumberFieldScrubArea className={cn(styles.scrubHandle(), classNames?.scrubHandle)}>
            <ChevronsLeftRight aria-hidden />
            {cursor}
          </NumberFieldScrubArea>
        )}
        {!hideButtons && <NumberFieldDecrement aria-label="Decrease" className={classNames?.button} />}
        <NumberFieldInput
          placeholder={placeholder}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          className={cn(hideButtons && 'px-2 text-start', classNames?.input)}
        />
        {!hideButtons && <NumberFieldIncrement aria-label="Increase" className={classNames?.button} />}
      </NumberFieldGroup>
    </NumberFieldRoot>
  );
}

export const NumberField = Object.assign(NumberFieldSimple, {
  Root: NumberFieldRoot,
  Group: NumberFieldGroup,
  Input: NumberFieldInput,
  Decrement: NumberFieldDecrement,
  Increment: NumberFieldIncrement,
  ScrubArea: NumberFieldScrubArea,
  ScrubAreaCursor: NumberFieldScrubAreaCursor,
});
