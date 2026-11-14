import { Field, Slider } from '@crazy-staff/ui';

export default function SliderField() {
  return (
    <Field className="w-full max-w-sm" description="Applies to every NPC in the current world." name="damage">
      <Slider label="Enemy damage" showValue defaultValue={100} min={10} max={300} step={10} />
    </Field>
  );
}
