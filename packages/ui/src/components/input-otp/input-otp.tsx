import { OTPField } from '@base-ui/react/otp-field';
import { Minus } from 'lucide-react';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { inputOtpStyles } from './input-otp.styles';

type Size = VariantProps<typeof inputOtpStyles>['size'];
const SizeContext = React.createContext<Size>('md');

type RootProps = React.ComponentPropsWithRef<typeof OTPField.Root>;

export interface InputOTPRootProps extends Omit<RootProps, 'className'>, VariantProps<typeof inputOtpStyles> {
  className?: string;
}

function InputOTPRoot({ size, className, ...props }: InputOTPRootProps) {
  return (
    <SizeContext value={size}>
      <OTPField.Root className={cn(inputOtpStyles().root(), className)} {...props} />
    </SizeContext>
  );
}

/** One character box. */
function InputOTPSlot({ className, ...props }: Omit<React.ComponentPropsWithRef<typeof OTPField.Input>, 'className'> & { className?: string }) {
  const size = React.useContext(SizeContext);
  return <OTPField.Input className={cn(inputOtpStyles({ size }).slot(), className)} {...props} />;
}

/** Slots that sit closer together. */
function InputOTPGroup({ className, ...props }: React.ComponentPropsWithRef<'div'>) {
  return <div className={cn(inputOtpStyles().group(), className)} {...props} />;
}

/** A dash between groups (or your own children). Announced as a separator. */
function InputOTPSeparator({ className, children, ...props }: Omit<React.ComponentPropsWithRef<typeof OTPField.Separator>, 'className'> & { className?: string }) {
  return (
    <OTPField.Separator className={cn(inputOtpStyles().separator(), className)} {...props}>
      {children ?? <Minus aria-hidden />}
    </OTPField.Separator>
  );
}

export interface InputOTPProps extends InputOTPRootProps {
  /** Split the slots into groups with a separator between, e.g. `[3, 3]`. Must add up to `length`. */
  groups?: number[];
  /** What goes between groups. @default a dash */
  separator?: React.ReactNode;
  /** Hint shown in empty slots, one character per slot (e.g. `'•'`). */
  slotPlaceholder?: string;
  classNames?: { root?: string; group?: string; slot?: string; separator?: string };
}

/**
 * A one-time code field made of single-character slots. Paste, arrows and Backspace work across slots.
 *   <InputOTP length={6} groups={[3, 3]} />
 * Compound: InputOTP.Root / Group / Slot / Separator.
 */
function InputOTPSimple({
  length,
  groups = [length],
  separator,
  slotPlaceholder,
  className,
  classNames,
  'aria-label': ariaLabel,
  ...props
}: InputOTPProps) {
  const labelId = React.useId();
  let index = 0;
  return (
    <InputOTPRoot length={length} aria-label={ariaLabel} className={cn(classNames?.root, className)} {...props}>
      {/* Base UI names the first slot from a label element, never from `aria-label` */}
      {ariaLabel && (
        <span id={labelId} hidden>
          {ariaLabel}
        </span>
      )}
      {groups.map((count, g) => (
        <React.Fragment key={g}>
          {g > 0 && <InputOTPSeparator className={classNames?.separator}>{separator}</InputOTPSeparator>}
          <InputOTPGroup className={classNames?.group}>
            {Array.from({ length: count }, () => {
              const i = index++;
              return (
                <InputOTPSlot
                  key={i}
                  placeholder={slotPlaceholder}
                  className={classNames?.slot}
                  aria-labelledby={i === 0 && ariaLabel ? labelId : undefined}
                  aria-label={i === 0 ? undefined : `Character ${i + 1} of ${length}`}
                />
              );
            })}
          </InputOTPGroup>
        </React.Fragment>
      ))}
    </InputOTPRoot>
  );
}

export const InputOTP = Object.assign(InputOTPSimple, {
  Root: InputOTPRoot,
  Group: InputOTPGroup,
  Slot: InputOTPSlot,
  Separator: InputOTPSeparator,
});
