import { ToggleGroup } from '@crazy-staff/ui';
import { Kanban, LayoutGrid, List } from 'lucide-react';

export default function ToggleGroupIcons() {
  return (
    <ToggleGroup iconOnly aria-label="View" defaultValue={['board']}>
      <ToggleGroup.Item value="list" aria-label="List">
        <List />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="grid" aria-label="Grid">
        <LayoutGrid />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="board" aria-label="Board">
        <Kanban />
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}
