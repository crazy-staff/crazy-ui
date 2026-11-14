import { Slider } from '@crazy-staff/ui';

export default function SliderDefault() {
  return <Slider className="max-w-sm" label="Field of view" showValue defaultValue={90} min={60} max={120} />;
}
