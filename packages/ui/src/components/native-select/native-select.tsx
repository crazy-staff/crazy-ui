import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { nativeSelectStyles } from './native-select.styles';

export interface NativeSelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface NativeSelectProps
  extends Omit<React.ComponentPropsWithRef<'select'>, 'size'>,
    VariantProps<typeof nativeSelectStyles> {
  /** Options to render; you can pass `<option>` children instead. */
  options?: NativeSelectOption[];
  /** A first, empty option shown while nothing is picked. */
  placeholder?: string;
  classNames?: { root?: string; select?: string; icon?: string };
}

/**
 * The browser's own `<select>`, styled like Input with a chevron. Best on phones and in long forms.
 *   <NativeSelect options={[{ value: 'g1', label: 'Gothic 1' }]} />
 * or with children: `<NativeSelect><NativeSelect.Option value="g1">Gothic 1</NativeSelect.Option></NativeSelect>`.
 */
function NativeSelectRoot({ options, placeholder, size, className, classNames, children, ...props }: NativeSelectProps) {
  const styles = nativeSelectStyles({ size });
  return (
    <span data-slot="native-select" className={cn(styles.root(), classNames?.root, className)}>
      <select className={cn(styles.select(), classNames?.select)} {...props}>
        {placeholder !== undefined && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options?.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
        {children}
      </select>
      <ChevronDown aria-hidden className={cn(styles.icon(), classNames?.icon)} />
    </span>
  );
}

const NativeSelectOption = (props: React.ComponentPropsWithRef<'option'>) => <option {...props} />;
const NativeSelectOptGroup = (props: React.ComponentPropsWithRef<'optgroup'>) => <optgroup {...props} />;

export const NativeSelect = Object.assign(NativeSelectRoot, {
  Option: NativeSelectOption,
  OptGroup: NativeSelectOptGroup,
});
