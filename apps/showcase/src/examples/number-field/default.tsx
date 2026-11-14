import { NumberField } from '@crazy-staff/ui';

export default function NumberFieldDefault() {
  return <NumberField className="max-w-44" label="Ore amount" defaultValue={50} min={0} max={999} />;
}
