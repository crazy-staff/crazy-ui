import { Slider } from '@crazy-staff/ui';

export default function SliderDisabled() {
  return <Slider className="max-w-sm" label="Gravity" showValue defaultValue={100} disabled />;
}
