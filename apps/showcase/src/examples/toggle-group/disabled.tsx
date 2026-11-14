import { ToggleGroup } from '@crazy-staff/ui';

export default function ToggleGroupDisabled() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup
        aria-label="Game"
        defaultValue={['g1']}
        items={[
          { value: 'g1', label: 'Gothic 1' },
          { value: 'g2', label: 'Gothic 2' },
          { value: 'com', label: 'Chronicles', disabled: true },
        ]}
      />
      <ToggleGroup
        disabled
        aria-label="Renderer"
        defaultValue={['dx11']}
        items={[
          { value: 'dx11', label: 'GD3D11' },
          { value: 'dx7', label: 'DirectX 7' },
        ]}
      />
    </div>
  );
}
