import { NativeSelect } from '@crazy-staff/ui';

export default function NativeSelectGroups() {
  return (
    <NativeSelect aria-label="Renderer" defaultValue="dx11" className="max-w-64">
      <NativeSelect.OptGroup label="Supported">
        <NativeSelect.Option value="dx11">GD3D11</NativeSelect.Option>
        <NativeSelect.Option value="dx7">DirectX 7 (original)</NativeSelect.Option>
      </NativeSelect.OptGroup>
      <NativeSelect.OptGroup label="Planned">
        <NativeSelect.Option value="vk" disabled>
          Vulkan
        </NativeSelect.Option>
      </NativeSelect.OptGroup>
    </NativeSelect>
  );
}
