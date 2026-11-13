import { Input as BaseInput } from '@base-ui/react/input';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { inputGroupStyles } from './input-group.styles';

type Size = VariantProps<typeof inputGroupStyles>['size'];
const SizeContext = React.createContext<Size>('md');

function InputGroupRoot({ className, size, ...props }: React.ComponentPropsWithRef<'div'> & { size?: Size }) {
  return (
    <SizeContext value={size}>
      <div className={cn(inputGroupStyles({ size }).root(), className)} {...props} />
    </SizeContext>
  );
}

function InputGroupInput({ className, ...props }: Omit<React.ComponentPropsWithRef<typeof BaseInput>, 'className'> & { className?: string }) {
  return <BaseInput className={cn(inputGroupStyles().input(), className)} {...props} />;
}

function InputGroupAddon({ className, ...props }: React.ComponentPropsWithRef<'span'>) {
  return <span className={cn(inputGroupStyles().addon(), className)} {...props} />;
}

export interface InputGroupProps
  extends Omit<React.ComponentPropsWithRef<typeof BaseInput>, 'className' | 'size'>,
    VariantProps<typeof inputGroupStyles> {
  /** Icon or text before the input (e.g. a search icon, "https://"). */
  start?: React.ReactNode;
  /** Icon, text or a small button after the input (e.g. a `Kbd`, a clear button). */
  end?: React.ReactNode;
  className?: string;
  classNames?: { root?: string; input?: string; start?: string; end?: string };
}

/**
 * An input with add-ons. Short form: `<InputGroup start={<Search />} end={<Kbd>K</Kbd>} />`.
 * Compound: `InputGroup.Root`, `InputGroup.Addon`, `InputGroup.Input`.
 */
function InputGroupSimple({ start, end, size, className, classNames, ...props }: InputGroupProps) {
  return (
    <InputGroupRoot size={size} className={cn(classNames?.root, className)}>
      {start && <InputGroupAddon className={classNames?.start}>{start}</InputGroupAddon>}
      <InputGroupInput className={classNames?.input} {...props} />
      {end && <InputGroupAddon className={classNames?.end}>{end}</InputGroupAddon>}
    </InputGroupRoot>
  );
}

export const InputGroup = Object.assign(InputGroupSimple, {
  Root: InputGroupRoot,
  Input: InputGroupInput,
  Addon: InputGroupAddon,
});
