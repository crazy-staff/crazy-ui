import { Button, Tooltip } from '@crazy-staff/ui';
import { Clock, Eye, Footprints, MapPin, Shield, Sparkles } from 'lucide-react';

const tools = [
  { label: 'God mode', icon: <Shield /> },
  { label: 'Infinite mana', icon: <Sparkles /> },
  { label: 'Teleport to marker', icon: <MapPin /> },
  { label: 'Walk through walls', icon: <Footprints /> },
  { label: 'Show hidden NPCs', icon: <Eye /> },
  { label: 'Skip to morning', icon: <Clock /> },
];

export default function TooltipToolbar() {
  return (
    <Tooltip.Provider>
      <div className="squircle flex gap-1 rounded-control-lg border border-border bg-surface p-1">
        {tools.map((t) => (
          <Tooltip key={t.label} content={t.label} side="bottom">
            <Button size="icon" variant="ghost" aria-label={t.label}>
              {t.icon}
            </Button>
          </Tooltip>
        ))}
      </div>
    </Tooltip.Provider>
  );
}
