import {
  Accordion,
  Alert,
  AspectRatio,
  Avatar,
  Breadcrumb,
  Button,
  Chip,
  Collapsible,
  Empty,
  Pagination,
  Progress,
  ScrollArea,
  Separator,
  Skeleton,
  Spinner,
  Table,
  Tabs,
} from '@crazy-staff/ui';
import { Link } from '@tanstack/react-router';
import { Inbox, Plus, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Example } from '@/components/docs/preview';

export function TabsDemo() {
  const items = [
    { value: 'overview', label: 'Overview', content: <p className="text-sm text-muted">Stats, look and the hero's equipment.</p> },
    { value: 'cheats', label: 'Cheats', content: <p className="text-sm text-muted">God mode, infinite mana, no clip.</p> },
    { value: 'teleports', label: 'Teleports', content: <p className="text-sm text-muted">Jump to any marker on the map.</p> },
    { value: 'logs', label: 'Logs', content: <p className="text-sm text-muted">What happened this session.</p>, disabled: true },
  ];
  return (
    <div className="flex w-full flex-col gap-8">
      <Tabs items={items} />
      <Tabs items={items} variant="line" />
    </div>
  );
}

export function AccordionDemo() {
  return (
    <div className="w-full max-w-xl">
      <Accordion
        defaultValue={['install']}
        items={[
          { value: 'install', title: 'How do I install the trainer?', content: 'Copy the files into the game folder and start Gothic. The menu opens with F1.' },
          { value: 'steam', title: 'Does it work with the Steam version?', content: 'Yes — Gothic 1 from Steam with the GD3D11 renderer.' },
          { value: 'saves', title: 'Will it break my saves?', content: 'No. Cheats only change the running game; saves stay compatible.' },
        ]}
      />
    </div>
  );
}

export function CollapsibleDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-1">
      <Collapsible title="Advanced options">
        <div className="flex flex-col gap-2 px-2.5 pt-2 pb-1 text-sm text-muted">
          <span>Renderer: GD3D11</span>
          <span>Language: English</span>
          <span>Overlay scale: 100 %</span>
        </div>
      </Collapsible>
      <Collapsible title="Opened by default" defaultOpen>
        <p className="px-2.5 pt-2 text-sm text-muted">The panel height animates with the content.</p>
      </Collapsible>
    </div>
  );
}

const AVATAR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b9a8ff"/><stop offset="1" stop-color="#6f5bd6"/></linearGradient></defs><rect width="64" height="64" fill="url(#g)"/><circle cx="32" cy="26" r="11" fill="#fff" fill-opacity=".85"/><rect x="14" y="41" width="36" height="20" rx="10" fill="#fff" fill-opacity=".85"/></svg>`,
  );

export function AvatarDemo() {
  return (
    <div className="flex w-full flex-col gap-5">
      <Example label="sizes">
        <Avatar size="sm" name="Dawid Seipold" />
        <Avatar size="md" name="Dawid Seipold" />
        <Avatar size="lg" name="Dawid Seipold" />
      </Example>
      <Example label="image">
        <Avatar size="sm" src={AVATAR} name="Diego" />
        <Avatar size="md" src={AVATAR} name="Diego" />
        <Avatar size="lg" src={AVATAR} name="Diego" />
      </Example>
      <Example label="group">
        <div className="flex -space-x-2">
          {['Diego', 'Milten Mage', 'Gorn', 'Lester'].map((n) => (
            <Avatar key={n} name={n} className="ring-2 ring-surface" />
          ))}
        </div>
      </Example>
    </div>
  );
}

export function AlertDemo() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <Alert title="New build available">Version 0.9 adds teleports and fixes the arena crash.</Alert>
      <Alert variant="success" title="Verified">God mode was tested on the latest build and works.</Alert>
      <Alert variant="warning" title="Works badly">Polymorph sometimes leaves the hero stuck. Save before using it.</Alert>
      <Alert variant="danger" title="Crashes">Meteors crash the game in the Old Camp. Don't use them there yet.</Alert>
      <Alert variant="neutral">A plain note without a title.</Alert>
    </div>
  );
}

export function SeparatorDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <div className="text-sm">
        <p className="font-medium">crazy-ui</p>
        <p className="text-muted">The design system of the Crazy ecosystem.</p>
      </div>
      <Separator />
      <div className="flex h-5 items-center gap-4 text-sm text-muted">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>Changelog</span>
      </div>
      <Separator label="or" />
    </div>
  );
}

export function SkeletonDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      {[0, 1].map((i) => (
        <div key={i} className="squircle flex flex-col gap-4 rounded-card border border-border bg-background p-5">
          <div className="flex items-center gap-3">
            <Skeleton shape="circle" className="size-9" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="w-1/2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
          <Skeleton lines={3} />
          <Skeleton shape="block" className="h-8 w-24" />
        </div>
      ))}
    </div>
  );
}

export function SpinnerDemo() {
  return (
    <div className="flex w-full flex-col gap-5">
      <Example label="sizes">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </Example>
      <Example label="in a button">
        <Button disabled>
          <Spinner size="sm" tone="current" /> Saving…
        </Button>
        <Button variant="outline" disabled>
          <Spinner size="sm" tone="muted" /> Loading
        </Button>
      </Example>
    </div>
  );
}

export function ProgressDemo() {
  const [value, setValue] = useState(18);
  useEffect(() => {
    const t = setInterval(() => setValue((v) => (v >= 100 ? 8 : Math.min(100, v + 9))), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Progress value={value} label="Downloading build 0.9" />
      <Progress value={64} size="sm" />
      <Progress value={null} label="Preparing…" showValue={false} />
    </div>
  );
}

export function BreadcrumbDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Breadcrumb
        items={[{ label: 'Docs', href: '/docs' }, { label: 'Components', href: '/docs/all-components' }, { label: 'Breadcrumb' }]}
        renderLink={(item) => <Link to={item.href as "/"} />}
      />
      <Breadcrumb
        items={[{ label: 'Gothic 1', href: '#' }, { label: 'Character', href: '#' }, { label: 'Cheats', href: '#' }, { label: 'God mode' }]}
      />
    </div>
  );
}

export function PaginationDemo() {
  const [page, setPage] = useState(4);
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <Pagination page={page} total={20} onPageChange={setPage} />
      <span className="text-xs text-muted">Page {page} of 20</span>
    </div>
  );
}

export function EmptyDemo() {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <Empty
        icon={<Inbox />}
        title="No posts yet"
        description="Be the first to suggest a feature for the trainer."
        action={
          <Button size="sm">
            <Plus /> New post
          </Button>
        }
      />
      <Empty icon={<Sparkles />} title="Nothing here" description="No features match these filters." action={<Button size="sm" variant="outline">Clear filters</Button>} />
    </div>
  );
}

export function ScrollAreaDemo() {
  const tags = Array.from({ length: 40 }, (_, i) => `v0.${40 - i}`);
  return (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="squircle h-64 rounded-card border border-border bg-background">
        <ScrollArea className="h-full" fade>
          <div className="flex flex-col p-2">
            <span className="px-3 pt-2 pb-1 text-xs font-medium text-muted">Releases</span>
            {tags.map((t) => (
              <span key={t} className="squircle rounded-item px-3 py-2 text-sm hover:bg-hover">
                {t}
              </span>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="squircle rounded-card border border-border bg-background">
        <ScrollArea orientation="horizontal">
          <div className="flex w-max gap-3 p-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="squircle flex size-28 shrink-0 items-center justify-center rounded-control bg-surface-2 text-sm text-muted">
                Screenshot {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

const features = [
  { name: 'God mode', area: 'Character', status: 'verified' },
  { name: 'Infinite mana', area: 'Character', status: 'verified' },
  { name: 'Polymorph', area: 'Fun', status: 'works badly' },
  { name: 'Meteors', area: 'Fun', status: 'crashes' },
  { name: 'Teleport', area: 'World', status: 'new' },
];
const tone = { verified: 'soft', 'works badly': 'outline', crashes: 'neutral', new: 'solid' } as const;

export function TableDemo() {
  return (
    <div className="w-full">
      <Table
        hover
        rowKey={(r) => r.name}
        columns={[
          { key: 'name', header: 'Feature', className: 'font-medium' },
          { key: 'area', header: 'Area', className: 'text-muted' },
          {
            key: 'status',
            header: 'Status',
            cell: (r) => (
              <Chip size="sm" variant={tone[r.status as keyof typeof tone]}>
                {r.status}
              </Chip>
            ),
          },
        ]}
        rows={features}
        caption="Test status from the last report."
      />
    </div>
  );
}

export function AspectRatioDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-[2fr_1fr]">
      <AspectRatio ratio={16 / 9} rounded className="border border-border">
        <div className="glow absolute inset-0 bg-surface-2" />
        <span className="absolute inset-0 flex items-center justify-center text-sm text-muted">16 / 9</span>
      </AspectRatio>
      <AspectRatio ratio={1} rounded className="border border-border">
        <div className="absolute inset-0 bg-surface-2" />
        <span className="absolute inset-0 flex items-center justify-center text-sm text-muted">1 / 1</span>
      </AspectRatio>
    </div>
  );
}
