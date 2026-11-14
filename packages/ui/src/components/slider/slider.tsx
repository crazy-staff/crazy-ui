import { Slider as BaseSlider } from '@base-ui/react/slider';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { sliderStyles } from './slider.styles';

const styles = sliderStyles();

export interface SliderProps extends Omit<React.ComponentPropsWithRef<typeof BaseSlider.Root>, 'className'> {
  /** Text above the track. */
  label?: React.ReactNode;
  /** Show the current value next to the label. */
  showValue?: boolean;
  /** Classes for the root, merged last. */
  className?: string;
  /** Classes per slot. */
  classNames?: { root?: string; label?: string; value?: string; track?: string; indicator?: string; thumb?: string };
}

/**
 * Pick a value on a track. Pass an array as `defaultValue` for a range (two thumbs).
 * Compound parts (styled): `Slider.Root`, `Slider.Label`, `Slider.Value`, `Slider.Control`, `Slider.Track`,
 * `Slider.Indicator`, `Slider.Thumb`.
 */
function SliderSimple({ label, showValue = false, className, classNames, defaultValue, value, ...props }: SliderProps) {
  const initial = value ?? defaultValue;
  const thumbs = Array.isArray(initial) ? initial.length : 1;
  return (
    <BaseSlider.Root
      defaultValue={defaultValue}
      value={value}
      className={cn(styles.root(), classNames?.root, className)}
      {...props}
    >
      {(label || showValue) && (
        <div className={styles.header()}>
          {label && <BaseSlider.Label className={cn(styles.label(), classNames?.label)}>{label}</BaseSlider.Label>}
          {showValue && <BaseSlider.Value className={cn(styles.value(), classNames?.value)} />}
        </div>
      )}
      <BaseSlider.Control className={styles.control()}>
        <BaseSlider.Track className={cn(styles.track(), classNames?.track)}>
          <BaseSlider.Indicator className={cn(styles.indicator(), classNames?.indicator)} />
          {Array.from({ length: thumbs }, (_, i) => (
            <BaseSlider.Thumb key={i} index={thumbs > 1 ? i : undefined} className={cn(styles.thumb(), classNames?.thumb)} />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}

type Part<C extends React.ElementType> = Omit<React.ComponentPropsWithRef<C>, 'className'> & { className?: string };

function SliderRoot({ className, ...props }: Part<typeof BaseSlider.Root>) {
  return <BaseSlider.Root className={cn(styles.root(), className)} {...props} />;
}
function SliderLabel({ className, ...props }: Part<typeof BaseSlider.Label>) {
  return <BaseSlider.Label className={cn(styles.label(), className)} {...props} />;
}
function SliderValue({ className, ...props }: Part<typeof BaseSlider.Value>) {
  return <BaseSlider.Value className={cn(styles.value(), className)} {...props} />;
}
function SliderControl({ className, ...props }: Part<typeof BaseSlider.Control>) {
  return <BaseSlider.Control className={cn(styles.control(), className)} {...props} />;
}
function SliderTrack({ className, ...props }: Part<typeof BaseSlider.Track>) {
  return <BaseSlider.Track className={cn(styles.track(), className)} {...props} />;
}
function SliderIndicator({ className, ...props }: Part<typeof BaseSlider.Indicator>) {
  return <BaseSlider.Indicator className={cn(styles.indicator(), className)} {...props} />;
}
function SliderThumb({ className, ...props }: Part<typeof BaseSlider.Thumb>) {
  return <BaseSlider.Thumb className={cn(styles.thumb(), className)} {...props} />;
}

export const Slider = Object.assign(SliderSimple, {
  Root: SliderRoot,
  Label: SliderLabel,
  Value: SliderValue,
  Control: SliderControl,
  Track: SliderTrack,
  Indicator: SliderIndicator,
  Thumb: SliderThumb,
});
