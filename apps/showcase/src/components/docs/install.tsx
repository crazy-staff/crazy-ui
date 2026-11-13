import { Tabs } from '@crazy-staff/ui';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { useEffect, useState } from 'react';
import { getComponentSources } from '@/examples/registry';
import { Code, CollapsibleCode } from './code';

const MANAGERS = [
  ['bun', 'bun add'],
  ['npm', 'npm install'],
  ['pnpm', 'pnpm add'],
  ['yarn', 'yarn add'],
] as const;

/** One install command, with a tab per package manager. */
export function PackageInstall({ packages }: { packages: string }) {
  return (
    <Tabs
      variant="pill"
      className="not-prose"
      items={MANAGERS.map(([pm, cmd]) => ({
        value: pm,
        label: pm,
        content: <Code lang="sh" code={`${cmd} ${packages}`} />,
      }))}
    />
  );
}

function SourceFiles({ component }: { component: string }) {
  const [files, setFiles] = useState<{ file: string; source: string }[] | null>(null);
  useEffect(() => {
    void getComponentSources(component).then(setFiles);
  }, [component]);
  if (!files) return <p className="text-sm text-muted">Loading the source…</p>;
  return (
    <div className="not-prose flex flex-col gap-3">
      {files.map((f) => (
        <CollapsibleCode key={f.file} title={`components/ui/${component}/${f.file}`} code={f.source} label="Expand" />
      ))}
    </div>
  );
}

/**
 * How to add a component, like shadcn/ui: "Command" (today the whole package; a CLI that copies
 * single components is planned) or "Manual" (copy the source into your project).
 */
export function InstallTabs({ component, deps = '@base-ui/react tailwind-variants tailwind-merge clsx' }: { component: string; deps?: string }) {
  return (
    <Tabs
      variant="line"
      className="not-prose my-6"
      items={[
        {
          value: 'command',
          label: 'Command',
          content: (
            <div className="flex flex-col gap-3 pt-2">
              <PackageInstall packages="@crazy-staff/ui" />
              <p className="text-sm text-muted">
                A CLI that copies just this component into your project (<code className="font-mono">crazy-ui add {component}</code>) is
                planned; until then, install the package.
              </p>
            </div>
          ),
        },
        {
          value: 'manual',
          label: 'Manual',
          content: (
            <div className="pt-2">
              <Steps>
                <Step>
                  <p className="mb-3 text-sm">Install the dependencies.</p>
                  <PackageInstall packages={deps} />
                </Step>
                <Step>
                  <p className="mb-3 text-sm">
                    Add the theme (<code className="font-mono">theme.css</code>) and the <code className="font-mono">cn</code> /{' '}
                    <code className="font-mono">tv</code> helpers from the Installation page, then copy these files into your project.
                  </p>
                  <SourceFiles component={component} />
                </Step>
                <Step>
                  <p className="text-sm">Update the import paths to match your project.</p>
                </Step>
              </Steps>
            </div>
          ),
        },
      ]}
    />
  );
}
