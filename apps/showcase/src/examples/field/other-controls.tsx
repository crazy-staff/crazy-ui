import { Field, Select, Slider, Textarea } from '@crazy-staff/ui';

export default function FieldOtherControls() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Field label="Renderer" description="GD3D11 is needed for the in-game menu.">
        <Select
          className="w-full"
          defaultValue="gd3d11"
          items={[
            { value: 'gd3d11', label: 'GD3D11' },
            { value: 'native', label: 'Native (DirectX 7)' },
          ]}
        />
      </Field>
      <Field description="1.0 is the normal game speed.">
        <Slider label="World speed" showValue defaultValue={1} min={0.25} max={4} step={0.25} />
      </Field>
      <Field label="Notes for testers">
        <Field.Control render={<Textarea rows={3} placeholder="What should they check first?" />} />
      </Field>
    </div>
  );
}
