import { createFileRoute } from '@tanstack/react-router';
import { Button, Card, Chip, Input, Switch, cn, registerSquircles } from '@crazy-staff/ui';
import {
  ArrowRight,
  Check,
  Download,
  Eye,
  Flame,
  Moon,
  Plus,
  Rocket,
  Sparkles,
  Star,
  Sun,
  Trash2,
  User,
} from 'lucide-react';
import * as React from 'react';
import { AppShell } from '@/components/shell/app-shell';
import { roundNav } from '@/components/shell/nav';
import { Row, Section, Segmented } from '@/components/round1b/controls';

export const Route = createFileRoute('/')({
  component: Round1bPage,
});

type Glow = 'full' | 'framed';

function readStored(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode: just don't remember */
  }
}

function useShowcaseState() {
  const [dark, setDark] = React.useState(true);
  const [glow, setGlow] = React.useState<Glow>('full');
  const [squircle, setSquircle] = React.useState(true);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    // `?fallback` forces the Firefox/Safari squircle polyfill in Chromium, for comparison.
    registerSquircles({ force: new URLSearchParams(location.search).has('fallback') });
    const t = readStored('cui-theme');
    if (t) setDark(t === 'dark');
    const g = readStored('cui-glow');
    if (g === 'full' || g === 'framed') setGlow(g);
    if (readStored('cui-squircle') === 'off') setSquircle(false);
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    root.classList.toggle('light', !dark);
    if (loaded) store('cui-theme', dark ? 'dark' : 'light');
  }, [dark, loaded]);

  React.useEffect(() => {
    if (loaded) store('cui-glow', glow);
  }, [glow, loaded]);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--cui-corner-shape', squircle ? 'squircle' : 'round');
    if (loaded) store('cui-squircle', squircle ? 'on' : 'off');
    registerSquircles().refresh();
  }, [squircle, loaded]);

  return { dark, setDark, glow, setGlow, squircle, setSquircle };
}

/** Highlights the sidebar row of the section in view. */
function useActiveSection(fallback: string) {
  const [active, setActive] = React.useState(fallback);
  React.useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-10% 0px -70% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return active;
}

function Round1bPage() {
  const s = useShowcaseState();
  const active = useActiveSection('overview');

  return (
    <AppShell groups={roundNav} active={active}>
      {s.glow === 'full' && (
        <div aria-hidden className="glow pointer-events-none absolute inset-x-0 top-0 h-[34rem]" />
      )}

      <header className="relative flex flex-wrap items-center justify-between gap-3 px-8 pt-6">
        <div className="flex items-center gap-2 text-sm text-muted">
          <span>Design</span>
          <span>/</span>
          <span className="font-medium text-foreground">Round 1b</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Segmented
            label="Gradient"
            value={s.glow}
            onChange={s.setGlow}
            options={[
              { value: 'full', label: 'Gradient: full' },
              { value: 'framed', label: 'Gradient: framed' },
            ]}
          />
          <label className="squircle flex h-control-sm items-center gap-2.5 rounded-control-sm border border-border bg-surface-2/60 px-3 text-xs font-medium text-muted">
            Squircle
            <Switch size="sm" checked={s.squircle} onCheckedChange={s.setSquircle} aria-label="Squircle corners" />
          </label>
          <Button variant="outline" size="icon-sm" onClick={() => s.setDark((d) => !d)} aria-label="Toggle theme">
            {s.dark ? <Sun /> : <Moon />}
          </Button>
        </div>
      </header>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-14 px-8 pt-8 pb-24">
        <Hero framed={s.glow === 'framed'} />
        <Buttons />
        <Chips />
        <Forms />
        <Cards />
        <Colors />
        <Typography />
        <Radii />
        <Tokens />
      </div>
    </AppShell>
  );
}

function Hero({ framed }: { framed: boolean }) {
  const content = (
    <div className="relative flex flex-col items-start gap-4">
      <Chip>
        <Sparkles /> Round 1b · direction B
      </Chip>
      <h1 className="font-heading text-4xl font-[weight:var(--cui-heading-weight)] tracking-[var(--cui-heading-tracking)]">
        Soft, on the crazy-hub palette
      </h1>
      <p className="max-w-2xl text-base text-muted">
        Direction B with your changes: neutral colours from the hub docs, squircle corners that get
        tighter on smaller elements, the accent glow and the framed app layout with a collapsible
        sidebar.
      </p>
      <div className="flex flex-wrap gap-2.5 pt-1">
        <Button>
          Start with Introduction <ArrowRight />
        </Button>
        <Button variant="outline">View tokens</Button>
      </div>
    </div>
  );

  return (
    <section id="overview" data-section className="scroll-mt-6">
      {framed ? (
        <div className="squircle relative overflow-hidden rounded-card border border-border bg-surface px-10 py-12">
          <div aria-hidden className="glow pointer-events-none absolute inset-0" />
          {content}
        </div>
      ) : (
        <div className="py-6">{content}</div>
      )}
    </section>
  );
}

function DemoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('squircle flex flex-col gap-5 rounded-card border border-border bg-surface p-6', className)}>
      {children}
    </div>
  );
}

function Buttons() {
  return (
    <Section id="buttons" title="Buttons" description="Radius follows size: small controls are tighter, so nothing turns into a pill.">
      <DemoCard>
        <Row label="variants">
          <Button>
            Apply <ArrowRight />
          </Button>
          <Button variant="soft">
            <Star /> Soft
          </Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">
            <Trash2 /> Delete
          </Button>
        </Row>
        <Row label="sizes">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Row>
        <Row label="small row">
          <Button size="sm" variant="soft">
            <Plus /> Add
          </Button>
          <Button size="sm" variant="outline">
            <Download /> Export
          </Button>
          <Button size="sm" variant="ghost">
            Cancel
          </Button>
        </Row>
        <Row label="icon">
          <Button size="icon-sm" variant="soft" aria-label="Add">
            <Plus />
          </Button>
          <Button size="icon" variant="outline" aria-label="Show">
            <Eye />
          </Button>
          <Button size="icon" aria-label="Launch">
            <Rocket />
          </Button>
        </Row>
      </DemoCard>
    </Section>
  );
}

function Chips() {
  return (
    <Section id="chips" title="Chips" description="The smallest radius of the scale.">
      <DemoCard>
        <Row label="md">
          <Chip>
            <Check /> verified
          </Chip>
          <Chip variant="solid">new</Chip>
          <Chip variant="outline">beta</Chip>
          <Chip variant="neutral">4 pages</Chip>
        </Row>
        <Row label="sm">
          <Chip size="sm">
            <Check /> verified
          </Chip>
          <Chip size="sm" variant="solid">
            G1
          </Chip>
          <Chip size="sm" variant="outline" className="font-mono">
            Ctrl K
          </Chip>
          <Chip size="sm" variant="neutral">
            draft
          </Chip>
        </Row>
      </DemoCard>
    </Section>
  );
}

function Forms() {
  const [rows, setRows] = React.useState({ god: true, mana: false, esp: true });
  return (
    <Section id="forms" title="Inputs & switches">
      <div className="grid gap-4 lg:grid-cols-2">
        <DemoCard>
          <Row label="sm">
            <Input size="sm" placeholder="Filter…" className="w-64" />
          </Row>
          <Row label="md">
            <Input placeholder="Search features…" className="w-64" />
          </Row>
          <Row label="lg">
            <Input size="lg" placeholder="Name your kit" className="w-64" />
          </Row>
        </DemoCard>
        <DemoCard className="gap-0 p-2">
          {(
            [
              ['god', 'God mode', 'Ignore all damage.'],
              ['mana', 'Infinite mana', 'Keep the mana pool topped up.'],
              ['esp', 'Show ESP', 'Outline NPCs through walls.'],
            ] as const
          ).map(([key, title, desc]) => (
            <label
              key={key}
              className="squircle flex cursor-pointer items-center justify-between gap-4 rounded-item px-4 py-3 transition-colors duration-[var(--cui-duration-fast)] hover:bg-hover"
            >
              <span className="flex flex-col">
                <span className="text-sm font-medium">{title}</span>
                <span className="text-xs text-muted">{desc}</span>
              </span>
              <Switch
                checked={rows[key]}
                onCheckedChange={(v) => setRows((r) => ({ ...r, [key]: v }))}
                aria-label={title}
              />
            </label>
          ))}
        </DemoCard>
      </div>
    </Section>
  );
}

const topics = [
  { icon: Rocket, title: 'Getting started', desc: 'Install the trainer, learn the menu and the keys.', pages: 4 },
  { icon: User, title: 'Character', desc: 'The hero: stats, look, cheats, movement and combat.', pages: 5 },
  { icon: Flame, title: 'Fun', desc: 'Arena, zombie apocalypse, polymorph, meteors and other chaos.', pages: 3 },
];

function Cards() {
  return (
    <Section id="cards" title="Cards" description="Docs topic cards and a feature card. Hover them.">
      <div className="grid gap-4 md:grid-cols-3">
        {topics.map((t) => (
          <Card.Root key={t.title} interactive className="p-5">
            <span className="squircle mb-4 flex size-9 items-center justify-center rounded-control-sm bg-accent-soft text-accent-soft-foreground">
              <t.icon className="size-4" />
            </span>
            <h3 className="text-sm font-semibold">{t.title}</h3>
            <p className="mt-1 text-sm text-muted">{t.desc}</p>
            <Chip variant="neutral" size="sm" className="mt-3">
              {t.pages} pages
            </Chip>
          </Card.Root>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card.Root interactive>
          <Card.Header>
            <Card.Title>Infinite mana</Card.Title>
            <Card.Description>Keeps your mana pool topped up in combat.</Card.Description>
          </Card.Header>
          <Card.Body className="pt-3">
            <Chip>
              <Check /> verified
            </Chip>
          </Card.Body>
          <Card.Footer>
            <Button size="sm" className="w-full">
              Enable
            </Button>
          </Card.Footer>
        </Card.Root>
        <Card.Root>
          <Card.Header>
            <Card.Title>Teleport</Card.Title>
            <Card.Description>Jump to any marker on the map.</Card.Description>
          </Card.Header>
          <Card.Body className="flex gap-2 pt-3">
            <Chip variant="outline">yellow</Chip>
            <Chip variant="neutral">works badly</Chip>
          </Card.Body>
          <Card.Footer>
            <Button size="sm" variant="outline" className="flex-1">
              Details
            </Button>
            <Button size="sm" variant="soft" className="flex-1">
              Enable
            </Button>
          </Card.Footer>
        </Card.Root>
        <div className="squircle relative overflow-hidden rounded-card border border-border bg-surface p-5">
          <div aria-hidden className="glow pointer-events-none absolute inset-0" />
          <div className="relative flex h-full flex-col gap-2">
            <Chip variant="solid" size="sm" className="self-start">
              new
            </Chip>
            <h3 className="text-sm font-semibold">Gradient inside a frame</h3>
            <p className="text-sm text-muted">The glow fills the whole rounded box instead of being cut off.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

const swatches = [
  ['frame', 'bg-frame'],
  ['background', 'bg-background'],
  ['surface', 'bg-surface'],
  ['surface 2', 'bg-surface-2'],
  ['border', 'bg-border-strong'],
  ['muted', 'bg-muted'],
  ['foreground', 'bg-foreground'],
  ['accent', 'bg-accent'],
  ['accent soft', 'bg-accent-soft'],
  ['danger', 'bg-danger'],
  ['success', 'bg-success'],
  ['warning', 'bg-warning'],
] as const;

function Colors() {
  return (
    <Section id="colors" title="Colours" description="Neutral greys from the crazy-hub docs, Crazy purple accent.">
      <div className="grid gap-4 lg:grid-cols-2">
        {(['light', 'dark'] as const).map((mode) => (
          <div key={mode} className={cn(mode, 'squircle rounded-card border border-border bg-frame p-5 text-foreground')}>
            <div className="mb-4 font-mono text-[0.6875rem] uppercase tracking-wider text-muted">{mode}</div>
            <div className="grid grid-cols-6 gap-3">
              {swatches.map(([label, cls]) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <span className={cn('squircle size-11 rounded-control-sm border border-border-strong', cls)} />
                  <span className="text-center text-[0.625rem] leading-tight text-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Typography() {
  return (
    <Section id="type" title="Typography" description="Plus Jakarta Sans for text, Geist Mono for code and labels.">
      <DemoCard>
        <p className="font-heading text-4xl font-[weight:var(--cui-heading-weight)] tracking-[var(--cui-heading-tracking)]">Documentation</p>
        <p className="font-heading text-2xl font-[weight:var(--cui-heading-weight)] tracking-[var(--cui-heading-tracking)]">Browse by topic</p>
        <p className="text-base">The quick brown fox jumps over the lazy dog — 0123456789.</p>
        <p className="text-sm text-muted">Everything about the project, page by page.</p>
        <code className="font-mono text-sm text-accent-soft-foreground">--cui-accent: hsl(250 100% 80%)</code>
      </DemoCard>
    </Section>
  );
}

const radii = [
  ['chip', 'rounded-chip', 'size-10'],
  ['control-sm', 'rounded-control-sm', 'size-12'],
  ['control', 'rounded-control', 'size-14'],
  ['control-lg', 'rounded-control-lg', 'size-16'],
  ['item', 'rounded-item', 'size-14'],
  ['card', 'rounded-card', 'size-20'],
  ['panel', 'rounded-panel', 'size-24'],
] as const;

function Radii() {
  return (
    <Section id="radii" title="Radii" description="One scale, smaller radius for smaller things. Toggle Squircle at the top to compare.">
      <DemoCard>
        <div className="flex flex-wrap items-end gap-5">
          {radii.map(([label, r, size]) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span className={cn('squircle border border-border-strong bg-surface-2', r, size)} />
              <span className="font-mono text-[0.6875rem] text-muted">{label}</span>
            </div>
          ))}
        </div>
      </DemoCard>
    </Section>
  );
}

function Tokens() {
  return (
    <Section id="tokens" title="Tokens" description="An app restyles everything by overriding these CSS variables.">
      <DemoCard>
        <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-muted">{`:root {
  --cui-accent: hsl(250 80% 54%);
  --cui-corner-shape: squircle;   /* or round */
  --cui-radius-control: 1rem;     /* chip .5 · control-sm .75 · control 1 · card 1.5 · panel 1.75 */
  --cui-density: 1.15;            /* scales every control height */
  --cui-font-sans: 'Plus Jakarta Sans Variable', sans-serif;
}`}</pre>
      </DemoCard>
    </Section>
  );
}
