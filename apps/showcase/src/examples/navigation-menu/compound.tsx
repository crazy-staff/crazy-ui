import { NavigationMenu } from '@crazy-staff/ui';

const games = [
  { title: 'Gothic 1', href: '#gothic-1', description: 'Steam version, GD3D11 renderer.' },
  { title: 'Gothic 2', href: '#gothic-2', description: 'Night of the Raven. Coming later.' },
  { title: 'Chronicles of Myrtana', href: '#myrtana', description: 'Story mod support is planned.' },
];

export default function NavigationMenuCompound() {
  return (
    <NavigationMenu.Root aria-label="Games">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Games</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul className="grid gap-1 sm:w-80">
              {games.map((g) => (
                <li key={g.href}>
                  <NavigationMenu.LinkCard href={g.href} title={g.title} description={g.description} />
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link render={<a />} href="#github">
            GitHub
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Viewport align="center" />
    </NavigationMenu.Root>
  );
}
