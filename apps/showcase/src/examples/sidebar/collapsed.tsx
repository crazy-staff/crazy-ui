import { Button, Sidebar } from '@crazy-staff/ui';
import { Lightbulb, Map, ScrollText } from 'lucide-react';
import { useState } from 'react';

export default function SidebarCollapsed() {
  const [open, setOpen] = useState(false);
  return (
    <Sidebar.Provider open={open} onOpenChange={setOpen} shortcut={false} className="squircle h-80 min-h-0 overflow-hidden rounded-card border border-border">
      <Sidebar label="Feedback">
        <Sidebar.Content>
          <Sidebar.Group label="Feedback">
            <Sidebar.Item href="#ideas" icon={<Lightbulb />} active>Ideas</Sidebar.Item>
            <Sidebar.Item href="#roadmap" icon={<Map />}>Roadmap</Sidebar.Item>
            <Sidebar.Item href="#changelog" icon={<ScrollText />}>Changelog</Sidebar.Item>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar>
      <Sidebar.Inset className="items-start gap-3 p-6">
        <Sidebar.Trigger />
        <Button size="sm" variant="outline" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Open'} from outside
        </Button>
      </Sidebar.Inset>
    </Sidebar.Provider>
  );
}
