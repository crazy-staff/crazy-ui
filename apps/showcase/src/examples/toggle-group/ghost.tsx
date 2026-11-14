import { ToggleGroup } from '@crazy-staff/ui';
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react';

export default function ToggleGroupGhost() {
  return (
    <ToggleGroup variant="ghost" iconOnly aria-label="Menu alignment" defaultValue={['left']}>
      <ToggleGroup.Item value="left" aria-label="Align left">
        <AlignLeft />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="center" aria-label="Align center">
        <AlignCenter />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="right" aria-label="Align right">
        <AlignRight />
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}
