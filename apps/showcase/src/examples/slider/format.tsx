import { Slider } from '@crazy-staff/ui';

export default function SliderFormat() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Slider label="Drop rate" showValue defaultValue={0.25} min={0} max={1} step={0.05} format={{ style: 'percent' }} />
      <Slider
        label="Day length"
        showValue
        defaultValue={90}
        min={10}
        max={240}
        step={10}
        format={{ style: 'unit', unit: 'minute', unitDisplay: 'long' }}
      />
    </div>
  );
}
