/**
 * Every docs example is a file `src/examples/<component>/<example>.tsx` with a default export.
 * The registry gives docs pages both the component (for the live preview) and its source (for
 * "View code"), so the code shown is always exactly the code that runs.
 */
import type { ComponentType } from 'react';

const modules = import.meta.glob<{ default: ComponentType }>('./*/*.tsx', { eager: true });
const sources = import.meta.glob<string>('./*/*.tsx', { eager: true, query: '?raw', import: 'default' });

export interface Example {
  Component: ComponentType;
  source: string;
}

export function getExample(name: string): Example | undefined {
  const key = `./${name}.tsx`;
  const mod = modules[key];
  if (!mod) return undefined;
  return { Component: mod.default, source: (sources[key] ?? '').trim() };
}

/** Source files of a library component, for the manual installation steps. */
const librarySources = import.meta.glob<string>(
  ['../../../../packages/ui/src/components/*/*.{ts,tsx}', '!../../../../packages/ui/src/components/*/*.test.tsx'],
  { query: '?raw', import: 'default' },
);

export async function getComponentSources(component: string) {
  const prefix = `../../../../packages/ui/src/components/${component}/`;
  const entries = Object.entries(librarySources).filter(([path]) => path.startsWith(prefix));
  return Promise.all(
    entries.map(async ([path, load]) => ({ file: path.slice(prefix.length), source: (await load()).trim() })),
  );
}
