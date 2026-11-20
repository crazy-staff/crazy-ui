/**
 * Design round "Mobile" (issue #7): the variants shown side by side on /docs/rounds/mobile. Each demo
 * opens its drawer right away inside a phone frame, so the variants can be compared at a glance.
 * The picked variant becomes the library default; the others are deleted with this file.
 */
import { Button, DropdownMenu, Sidebar, cn, usePhone } from '@crazy-staff/ui';
import { Languages, Lightbulb, LogOut, Map, Monitor, Moon, ScrollText, Settings, Sparkles, Sun, User } from 'lucide-react';
import { type ReactNode, useState } from 'react';

export type Variant = 'a' | 'b' | 'c';

/* ---------------------------------------------- drawer rows ---------------------------------------------- */

const rowVariants: Record<Variant, { list?: string; row?: string; tile?: boolean }> = {
  // A — plain: rows straight on the drawer, 4px apart, neutral hover (crazy-hub round 7)
  a: {},
  // B — grouped: rows in one inset card with hairlines between them (settings-list style)
  b: {
    list: 'gap-0 squircle mt-3 overflow-hidden rounded-card border border-border bg-surface-2/60 p-0 divide-y divide-border',
    row: 'rounded-none px-4 min-h-13',
  },
  // C — icon tiles: each icon in a small squircle tile, label in medium weight
  c: { row: 'min-h-14 gap-3.5 font-medium', tile: true },
};

function Tile({ on, children }: { on: boolean; children: ReactNode }) {
  if (!on) return <>{children}</>;
  return (
    <span className="squircle flex size-9 shrink-0 items-center justify-center rounded-control-sm border border-border bg-surface-2 text-muted [&_svg]:size-5">
      {children}
    </span>
  );
}

export function RowsDemo({ variant }: { variant: Variant }) {
  const phone = usePhone();
  const v = rowVariants[variant];
  const items = [
    { label: 'Your profile', icon: <User /> },
    { label: 'Settings', icon: <Settings /> },
    { label: 'Language', icon: <Languages /> },
  ];
  return (
    <DropdownMenu.Root key={phone ? 'phone' : 'desktop'} defaultOpen={phone}>
      <DropdownMenu.Trigger render={<Button variant="outline" />}>
        <User /> Account
      </DropdownMenu.Trigger>
      <DropdownMenu.Content title="Account" classNames={{ list: v.list }}>
        {items.map((item) => (
          <DropdownMenu.Item key={item.label} className={v.row}>
            <Tile on={Boolean(v.tile && phone)}>{item.icon}</Tile>
            {item.label}
          </DropdownMenu.Item>
        ))}
        {variant !== 'b' && <DropdownMenu.Separator />}
        <DropdownMenu.Item danger className={v.row}>
          <Tile on={Boolean(v.tile && phone)}>
            <LogOut className={cn(v.tile && phone && 'text-danger')} />
          </Tile>
          Sign out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

/* --------------------------------------------- picked option --------------------------------------------- */

const pickedVariants: Record<Variant, string | undefined> = {
  // A — soft tint (60 % in a dropdown, full in a drawer) and a small check (crazy-hub round 7)
  a: undefined,
  // B — full tint everywhere, medium weight, the check in a filled accent dot
  b: cn(
    'data-[checked]:bg-accent-soft data-[checked]:font-medium aria-pressed:font-medium',
    'aria-pressed:[&>svg:last-child]:size-5! aria-pressed:[&>svg:last-child]:rounded-full aria-pressed:[&>svg:last-child]:bg-accent aria-pressed:[&>svg:last-child]:p-[3px] aria-pressed:[&>svg:last-child]:text-accent-foreground',
  ),
  // C — outlined: a light tint inside a thin accent border (every row keeps a transparent border: no shift)
  c: cn(
    'border border-transparent',
    'data-[checked]:border-accent/40 data-[checked]:bg-accent-soft/30 aria-pressed:border-accent/40 aria-pressed:bg-accent-soft/40',
  ),
};

const themes = [
  { value: 'light', label: 'Light', icon: <Sun /> },
  { value: 'dark', label: 'Dark', icon: <Moon /> },
  { value: 'system', label: 'System', icon: <Monitor /> },
];
const languages = [
  { value: 'en', label: 'English' },
  { value: 'pl', label: 'Polski' },
  { value: 'de', label: 'Deutsch' },
];

export function PickedDemo({ variant }: { variant: Variant }) {
  const phone = usePhone();
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('pl');
  const cls = pickedVariants[variant];
  return (
    <DropdownMenu.Root key={phone ? 'phone' : 'desktop'} defaultOpen={phone}>
      <DropdownMenu.Trigger render={<Button variant="outline" />}>
        <Settings /> Preferences
      </DropdownMenu.Trigger>
      <DropdownMenu.Content title="Preferences" showTitle className="min-w-52">
        <DropdownMenu.RadioGroup value={theme} onValueChange={(v) => setTheme(String(v))}>
          {themes.map((t) => (
            <DropdownMenu.RadioItem key={t.value} value={t.value} closeOnClick={false} className={cls}>
              {t.icon}
              {t.label}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.GroupLabel>Language</DropdownMenu.GroupLabel>
          <DropdownMenu.RadioGroup value={lang} onValueChange={(v) => setLang(String(v))}>
            {languages.map((l) => (
              <DropdownMenu.RadioItem key={l.value} value={l.value} lang={l.value} closeOnClick={false} className={cls}>
                {l.label}
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

/* -------------------------------------------- floating button -------------------------------------------- */

const fabVariants: Record<Variant, string | undefined> = {
  // A — surface: the page's surface colour, a border and the overlay shadow (crazy-hub round 7)
  a: undefined,
  // B — accent: filled with the accent, the opt-in glow under it
  b: 'border-transparent bg-accent text-accent-foreground shadow-glow',
  // C — frosted: translucent popover colour with a backdrop blur, no shadow
  c: 'bg-popover/70 shadow-none backdrop-blur-md',
};

const nav = [
  { name: 'Ideas', icon: Lightbulb },
  { name: 'Roadmap', icon: Map },
  { name: 'Changelog', icon: ScrollText },
];

export function FabDemo({ variant }: { variant: Variant }) {
  const [active, setActive] = useState('Ideas');
  return (
    <Sidebar.Provider mobileTrigger="inline" className="-m-4 min-h-svh w-[calc(100%+2rem)]">
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
        <h2 className="text-lg font-semibold">{active}</h2>
        <div className="mt-4 flex flex-col gap-3">
          {[0.9, 0.7, 1, 0.8, 0.6].map((w, i) => (
            <div key={i} className="squircle flex h-20 flex-col justify-center gap-2 rounded-card border border-border bg-surface px-4">
              <div className="h-2.5 rounded-full bg-border" style={{ width: `${w * 70}%` }} />
              <div className="h-2 rounded-full bg-border/60" style={{ width: `${w * 45}%` }} />
            </div>
          ))}
        </div>
        <Sidebar.Fab className={fabVariants[variant]} />
      </Sidebar.Inset>
    </Sidebar.Provider>
  );
}
