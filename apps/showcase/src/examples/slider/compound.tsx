import { Slider } from '@crazy-staff/ui';

export default function SliderCompound() {
  return (
    <Slider.Root className="max-w-sm" defaultValue={60}>
      <div className="flex items-center justify-between">
        <Slider.Label>Music volume</Slider.Label>
        <Slider.Value className="text-sm text-foreground" />
      </div>
      <Slider.Control>
        <Slider.Track className="h-2">
          <Slider.Indicator />
          <Slider.Thumb className="size-5" />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}
