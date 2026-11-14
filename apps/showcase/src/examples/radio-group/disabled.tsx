import { RadioGroup } from '@crazy-staff/ui';

export default function RadioGroupDisabled() {
  return (
    <RadioGroup
      aria-label="Renderer"
      defaultValue="gd3d11"
      items={[
        { value: 'gd3d11', label: 'GD3D11' },
        { value: 'native', label: 'Native (DirectX 7)' },
        { value: 'vulkan', label: 'Vulkan', description: 'Not supported yet.', disabled: true },
      ]}
    />
  );
}
