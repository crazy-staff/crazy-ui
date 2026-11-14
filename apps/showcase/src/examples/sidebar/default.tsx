import { Sidebar } from '@crazy-staff/ui';
import { BookOpen, Download, Lightbulb, Map, ScrollText, Settings, Sparkles, Users } from 'lucide-react';
import { useState } from 'react';

const nav = [
  { label: 'Feedback', items: [
    { name: 'Ideas', icon: Lightbulb, badge: 128 },
    { name: 'Roadmap', icon: Map },
    { name: 'Changelog', icon: ScrollText },
  ] },
  { label: 'Trainer', items: [
    { name: 'Docs', icon: BookOpen },
    { name: 'Downloads', icon: Download },
    { name: 'Testers', icon: Users },
  ] },
];

export default function SidebarDefault() {
  const [active, setActive] = useState('Ideas');
  return (
    <Sidebar.Provider className="squircle h-[30rem] min-h-0 overflow-hidden rounded-card border border-border">
      <Sidebar label="Crazy Hub">
        <Sidebar.Header>
          <Sparkles className="size-5 text-accent-soft-foreground" />
          <span className="me-auto font-semibold">Crazy Hub</span>
          <Sidebar.Trigger />
        </Sidebar.Header>
        <Sidebar.Content>
          {nav.map((group) => (
            <Sidebar.Group key={group.label} label={group.label}>
              {group.items.map((item) => (
                <Sidebar.Item
                  key={item.name}
                  render={<button type="button" />}
                  icon={<item.icon />}
                  badge={item.badge}
                  active={active === item.name}
                  onClick={() => setActive(item.name)}
                >
                  {item.name}
                </Sidebar.Item>
              ))}
            </Sidebar.Group>
          ))}
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Item render={<button type="button" />} icon={<Settings />}>
            Settings
          </Sidebar.Item>
        </Sidebar.Footer>
      </Sidebar>
      <Sidebar.Inset className="p-6">
        <div className="flex items-center gap-2">
          <Sidebar.Trigger className="in-data-[sidebar=open]:md:hidden" />
          <h2 className="text-lg font-semibold">{active}</h2>
        </div>
        <p className="mt-2 text-sm text-muted">Hover the rows: one block glides between them. Press Ctrl B to collapse.</p>
      </Sidebar.Inset>
    </Sidebar.Provider>
  );
}
