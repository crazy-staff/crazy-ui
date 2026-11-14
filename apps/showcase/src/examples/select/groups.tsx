import { Select } from '@crazy-staff/ui';

const renderers = { gd3d11: 'GD3D11', native: 'Native (DirectX 7)', vulkan: 'Vulkan' };

export default function SelectGroups() {
  return (
    <Select.Root items={renderers} defaultValue="gd3d11">
      <Select.Trigger aria-label="Renderer" className="w-56">
        <Select.Value placeholder="Pick a renderer" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.GroupLabel>Supported</Select.GroupLabel>
          <Select.Item value="gd3d11">GD3D11</Select.Item>
          <Select.Item value="native">Native (DirectX 7)</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.GroupLabel>Planned</Select.GroupLabel>
          <Select.Item value="vulkan" disabled>
            Vulkan
          </Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
