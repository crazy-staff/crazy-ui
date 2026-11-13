import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import * as UI from '@crazy-staff/ui';
import { Example, PageGlow, Preview } from '@/components/docs/preview';
import { ComponentGrid } from '@/components/docs/component-grid';

/** Every crazy-ui component (capitalised exports) is available in MDX without an import. */
const ui = Object.fromEntries(
  Object.entries(UI).filter(([name, value]) => /^[A-Z]/.test(name) && (typeof value === 'function' || typeof value === 'object')),
) as MDXComponents;

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...ui,
    Preview,
    PageGlow,
    Example,
    ComponentGrid,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
