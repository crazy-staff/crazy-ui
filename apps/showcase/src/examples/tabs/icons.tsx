import { Tabs } from '@crazy-staff/ui';
import { Map, Shield, Sparkles } from 'lucide-react';

export default function TabsIcons() {
  return (
    <Tabs
      className="w-full max-w-lg"
      items={[
        {
          value: 'character',
          label: (
            <>
              <Shield /> Character
            </>
          ),
          content: <p className="text-sm text-muted">12 cheats, 9 verified in the last report.</p>,
        },
        {
          value: 'teleports',
          label: (
            <>
              <Map /> Teleports
            </>
          ),
          content: <p className="text-sm text-muted">Old Camp, New Camp, Swamp Camp and the Sleeper's temple.</p>,
        },
        {
          value: 'fun',
          label: (
            <>
              <Sparkles /> Fun
            </>
          ),
          content: <p className="text-sm text-muted">Meteors still crash the game in the Old Camp.</p>,
        },
      ]}
    />
  );
}
