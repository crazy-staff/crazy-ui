/**
 * Every docs example is a file `src/examples/<component>/<example>.tsx` with a default export.
 * The registry gives docs pages both the component (for the live preview) and its source (for
 * "View code"), so the code shown is always exactly the code that runs.
 */
import { type ComponentType, type LazyExoticComponent, lazy } from 'react';

// Lazy: a page loads (and in dev, compiles) only the examples it shows, not all ~300 of them.
const modules = import.meta.glob<{ default: ComponentType }>('./*/*.tsx');
const sources = import.meta.glob<string>('./*/*.tsx', { query: '?raw', import: 'default' });
const components = new Map<string, LazyExoticComponent<ComponentType>>();

export interface Example {
  Component: LazyExoticComponent<ComponentType>;
  loadSource: () => Promise<string>;
}

export function getExample(name: string): Example | undefined {
  const key = `./${name}.tsx`;
  const load = modules[key];
  const loadSource = sources[key];
  if (!load || !loadSource) return undefined;
  let Component = components.get(key);
  if (!Component) {
    Component = lazy(load);
    components.set(key, Component);
  }
  return { Component, loadSource: async () => (await loadSource()).trim() };
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
