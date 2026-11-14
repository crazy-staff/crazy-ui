import { ContextMenu } from '@crazy-staff/ui';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

export default function ContextMenuCompound() {
  const [grid, setGrid] = useState(true);
  const [labels, setLabels] = useState(false);
  const [zoom, setZoom] = useState('100');

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="squircle flex h-44 w-full max-w-md flex-col items-center justify-center gap-1 rounded-card border border-border bg-surface-2 text-sm">
        <span className="font-medium">Map of the Colony</span>
        <span className="text-muted">
          Zoom {zoom}% · grid {grid ? 'on' : 'off'} · labels {labels ? 'on' : 'off'}
        </span>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Group>
          <ContextMenu.GroupLabel>View</ContextMenu.GroupLabel>
          <ContextMenu.CheckboxItem checked={grid} onCheckedChange={setGrid}>
            Show grid
          </ContextMenu.CheckboxItem>
          <ContextMenu.CheckboxItem checked={labels} onCheckedChange={setLabels}>
            Show place names
          </ContextMenu.CheckboxItem>
        </ContextMenu.Group>
        <ContextMenu.Separator />
        <ContextMenu.Group>
          <ContextMenu.GroupLabel>Zoom</ContextMenu.GroupLabel>
          <ContextMenu.RadioGroup value={zoom} onValueChange={setZoom}>
            {['50', '100', '200'].map((z) => (
              <ContextMenu.RadioItem key={z} value={z}>
                {z}%
              </ContextMenu.RadioItem>
            ))}
          </ContextMenu.RadioGroup>
        </ContextMenu.Group>
        <ContextMenu.Separator />
        <ContextMenu.Item onClick={() => setZoom('100')}>
          <RotateCcw /> Reset view
          <ContextMenu.Shortcut>0</ContextMenu.Shortcut>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
