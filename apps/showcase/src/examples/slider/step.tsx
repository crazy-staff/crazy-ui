import { Slider } from '@crazy-staff/ui';

export default function SliderStep() {
  return (
    <Slider
      className="max-w-sm"
      label="World speed"
      showValue
      defaultValue={1}
      min={0.25}
      max={4}
      step={0.25}
      format={{ minimumFractionDigits: 2 }}
    />
  );
}
