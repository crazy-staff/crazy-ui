import { NavigationMenu } from '@crazy-staff/ui';
import { BookOpen, Download, Keyboard, Lightbulb, Map, Users } from 'lucide-react';

export default function NavigationMenuDefault() {
  return (
    <NavigationMenu
      aria-label="Crazy hub"
      items={[
        {
          label: 'Trainer',
          links: [
            { title: 'Install', href: '#install', description: 'Copy the DLL into the game folder.', icon: <Download /> },
            { title: 'Features', href: '#features', description: 'God mode, teleports, items and more.', icon: <BookOpen /> },
            { title: 'Hotkeys', href: '#hotkeys', description: 'Every shortcut, and how to change them.', icon: <Keyboard /> },
            { title: 'Testers', href: '#testers', description: 'Ranks and how to join the test group.', icon: <Users /> },
          ],
        },
        {
          label: 'Community',
          columns: 1,
          links: [
            { title: 'Ideas', href: '#ideas', description: 'Post and vote on new features.', icon: <Lightbulb /> },
            { title: 'Roadmap', href: '#roadmap', description: 'What is planned, and when.', icon: <Map /> },
          ],
        },
        { label: 'Changelog', href: '#changelog' },
      ]}
    />
  );
}
