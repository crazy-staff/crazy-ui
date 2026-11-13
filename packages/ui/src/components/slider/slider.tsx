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
  className?: string;
  classNames?: { root?: string; track?: string; indicator?: string; thumb?: string };
}

/**
 * Pick a value on a track. Pass an array as `defaultValue` for a range (two thumbs).
 * Compound parts: `Slider.Root`, `Slider.Control`, `Slider.Track`, `Slider.Indicator`, `Slider.Thumb`.
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
          {label && <BaseSlider.Label className={styles.label()}>{label}</BaseSlider.Label>}
          {showValue && <BaseSlider.Value className={styles.value()} />}
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

export const Slider = Object.assign(SliderSimple, {
  Root: BaseSlider.Root,
  Label: BaseSlider.Label,
  Value: BaseSlider.Value,
  Control: BaseSlider.Control,
  Track: BaseSlider.Track,
  Indicator: BaseSlider.Indicator,
  Thumb: BaseSlider.Thumb,
});
