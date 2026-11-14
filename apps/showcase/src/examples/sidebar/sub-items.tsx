import { Sidebar } from '@crazy-staff/ui';
import { BookOpen, Download } from 'lucide-react';

export default function SidebarSubItems() {
  return (
    <Sidebar.Provider shortcut={false} className="squircle h-96 min-h-0 overflow-hidden rounded-card border border-border">
      <Sidebar label="Docs">
        <Sidebar.Content>
          <Sidebar.Group label="Docs">
            <Sidebar.Item href="#start" icon={<BookOpen />}>Getting started</Sidebar.Item>
            <Sidebar.Sub>
              <Sidebar.Item href="#install" active>Install</Sidebar.Item>
              <Sidebar.Item href="#hotkeys">Hotkeys</Sidebar.Item>
              <Sidebar.Item href="#update">Update</Sidebar.Item>
            </Sidebar.Sub>
            <Sidebar.Item href="#downloads" icon={<Download />} disabled>Downloads</Sidebar.Item>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar>
      <Sidebar.Inset className="p-6 text-sm text-muted">Nested rows hang on a guide line.</Sidebar.Inset>
    </Sidebar.Provider>
  );
}
