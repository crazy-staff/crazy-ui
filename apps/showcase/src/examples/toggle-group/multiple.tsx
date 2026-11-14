import { ToggleGroup } from '@crazy-staff/ui';
import { Map, Radar, ScanEye } from 'lucide-react';

export default function ToggleGroupMultiple() {
  return (
    <ToggleGroup multiple aria-label="Overlays" defaultValue={['esp', 'radar']}>
      <ToggleGroup.Item value="esp">
        <ScanEye />
        ESP
      </ToggleGroup.Item>
      <ToggleGroup.Item value="radar">
        <Radar />
        Radar
      </ToggleGroup.Item>
      <ToggleGroup.Item value="markers">
        <Map />
        Map markers
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}
