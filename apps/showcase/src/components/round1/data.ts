export interface Direction {
  id: 'a' | 'b' | 'c';
  scope: string;
  letter: string;
  name: string;
  tagline: string;
  notes: string;
}

export const directions: Direction[] = [
  {
    id: 'a',
    scope: 'dir-a',
    letter: 'A',
    name: 'Docs',
    tagline: 'close to fumadocs.dev',
    notes: 'Calm, neutral, Inter. Medium radius, flat surfaces. Reads like documentation.',
  },
  {
    id: 'b',
    scope: 'dir-b',
    letter: 'B',
    name: 'Soft',
    tagline: 'closer to HeroUI',
    notes: 'Rounder, roomier, Plus Jakarta Sans. Soft glowing shadows, bouncier motion.',
  },
  {
    id: 'c',
    scope: 'dir-c',
    letter: 'C',
    name: 'Technical',
    tagline: 'sharper — Linear / Raycast',
    notes: 'Tight, crisp, Geist + Geist Mono. Small radii, fast snappy motion.',
  },
];

export const swatches = [
  { token: 'bg-background', label: 'background', ring: true },
  { token: 'bg-surface-2', label: 'surface', ring: true },
  { token: 'bg-accent', label: 'accent' },
  { token: 'bg-accent-soft', label: 'accent soft', ring: true },
  { token: 'bg-muted', label: 'muted' },
  { token: 'bg-border-strong', label: 'border' },
  { token: 'bg-danger', label: 'danger' },
  { token: 'bg-success', label: 'success' },
];
