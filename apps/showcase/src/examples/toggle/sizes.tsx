import { Toggle } from '@crazy-staff/ui';
import { Radar } from 'lucide-react';

export default function ToggleSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <Toggle size="sm" defaultPressed>Radar</Toggle>
        <Toggle size="md" defaultPressed>Radar</Toggle>
        <Toggle size="lg" defaultPressed>Radar</Toggle>
      </div>
      <div className="flex items-center gap-3">
        <Toggle size="icon-sm" aria-label="Radar" defaultPressed><Radar /></Toggle>
        <Toggle size="icon" aria-label="Radar" defaultPressed><Radar /></Toggle>
        <Toggle size="icon-lg" aria-label="Radar" defaultPressed><Radar /></Toggle>
      </div>
    </div>
  );
}
