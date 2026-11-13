import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { radioGroupStyles } from './radio-group.styles';

const styles = radioGroupStyles();

export interface RadioProps extends Omit<React.ComponentPropsWithRef<typeof BaseRadio.Root>, 'className'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  classNames?: { item?: string; radio?: string; indicator?: string; description?: string };
}

/** One option of a `RadioGroup`. */
export function Radio({ label, description, className, classNames, ...props }: RadioProps) {
  const radio = (
    <BaseRadio.Root className={cn(styles.radio(), classNames?.radio, !label && className)} {...props}>
      <BaseRadio.Indicator keepMounted className={cn(styles.indicator(), classNames?.indicator)} />
    </BaseRadio.Root>
  );
  if (!label) return radio;
  return (
    <label className={cn(styles.item(), classNames?.item, className)}>
      {radio}
      <span className={styles.text()}>
        {label}
        {description && <span className={cn(styles.description(), classNames?.description)}>{description}</span>}
      </span>
    </label>
  );
}

export interface RadioGroupItem {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.ComponentPropsWithRef<typeof BaseRadioGroup>, 'className'> {
  /** Short form: the options. Or pass `<Radio>` children. */
  items?: RadioGroupItem[];
  className?: string;
}

/** Pick one option. `<RadioGroup items={[…]} />` or `<RadioGroup><Radio value="a" label="A" /></RadioGroup>`. */
export function RadioGroup({ items, className, children, ...props }: RadioGroupProps) {
  return (
    <BaseRadioGroup className={cn(styles.group(), className)} {...props}>
      {items
        ? items.map((i) => <Radio key={i.value} value={i.value} label={i.label} description={i.description} disabled={i.disabled} />)
        : children}
    </BaseRadioGroup>
  );
}
