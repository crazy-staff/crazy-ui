import { DropdownMenu, Button, Sidebar } from '@crazy-staff/ui';
import { BookOpen, Download, Languages, Lightbulb, Map, ScrollText, Sparkles } from 'lucide-react';
import { useState } from 'react';

const nav = [
  { name: 'Ideas', icon: Lightbulb },
  { name: 'Roadmap', icon: Map },
  { name: 'Changelog', icon: ScrollText },
  { name: 'Docs', icon: BookOpen },
  { name: 'Downloads', icon: Download },
];

/** On a phone the menu opens from the floating button in the bottom right, under the thumb. */
export default function SidebarPhone() {
  const [active, setActive] = useState('Ideas');
  return (
    <Sidebar.Provider className="-m-4 min-h-svh w-[calc(100%+2rem)]">
      <Sidebar label="Crazy Hub">
        <Sidebar.Header>
          <Sparkles className="size-5 text-accent-soft-foreground" />
          <span className="me-auto font-semibold">Crazy Hub</span>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group label="Feedback">
            {nav.map((item) => (
              <Sidebar.Item
                key={item.name}
                render={<button type="button" />}
                icon={<item.icon />}
                active={active === item.name}
                onClick={() => setActive(item.name)}
              >
                {item.name}
              </Sidebar.Item>
            ))}
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar>
      <Sidebar.Inset className="p-5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">{active}</h2>
          <DropdownMenu
            title="Language"
            showTitle
            trigger={
              <Button variant="ghost" size="icon" aria-label="Language">
                <Languages />
              </Button>
            }
            items={[
              { label: 'English', checked: true },
              { label: 'Polski', checked: false },
            ]}
          />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="squircle h-20 rounded-card border border-border bg-surface" />
          ))}
        </div>
      </Sidebar.Inset>
    </Sidebar.Provider>
  );
}
