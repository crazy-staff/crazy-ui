import { Tabs } from '@crazy-staff/ui';

export default function TabsLine() {
  return (
    <Tabs
      variant="line"
      className="w-full max-w-lg"
      items={[
        { value: 'overview', label: 'Overview', content: <p className="text-sm text-muted">What the trainer does and who tests it.</p> },
        { value: 'install', label: 'Install', content: <p className="text-sm text-muted">Copy the DLL into the game folder and start Gothic.</p> },
        { value: 'changelog', label: 'Changelog', content: <p className="text-sm text-muted">Build 0.9 adds teleports and fixes the arena crash.</p> },
      ]}
    />
  );
}
