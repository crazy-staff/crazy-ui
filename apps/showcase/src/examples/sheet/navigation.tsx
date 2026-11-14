import { Button, Sheet } from '@crazy-staff/ui';
import { BookOpen, Lightbulb, Map as MapIcon, Menu, Newspaper } from 'lucide-react';

const links = [
  { label: 'Ideas', icon: <Lightbulb /> },
  { label: 'Roadmap', icon: <MapIcon /> },
  { label: 'Changelog', icon: <Newspaper /> },
  { label: 'Docs', icon: <BookOpen /> },
];

export default function SheetNavigation() {
  return (
    <Sheet.Root>
      <Sheet.Trigger
        render={
          <Button size="icon" variant="outline" aria-label="Open navigation">
            <Menu />
          </Button>
        }
      />
      <Sheet.Content side="left" className="w-72">
        <Sheet.Header>
          <Sheet.Title>crazy-hub</Sheet.Title>
        </Sheet.Header>
        <nav className="mt-5 flex flex-col gap-1">
          {links.map((l) => (
            <Sheet.Close
              key={l.label}
              render={<Button variant="ghost" className="justify-start [&_svg]:text-muted" />}
            >
              {l.icon} {l.label}
            </Sheet.Close>
          ))}
        </nav>
      </Sheet.Content>
    </Sheet.Root>
  );
}
