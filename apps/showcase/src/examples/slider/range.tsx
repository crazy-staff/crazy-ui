import { Slider } from '@crazy-staff/ui';

export default function SliderRange() {
  return <Slider className="max-w-sm" label="Spawn level range" showValue defaultValue={[5, 30]} min={1} max={50} />;
}
