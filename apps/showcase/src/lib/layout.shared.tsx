import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import { version as uiVersion } from '../../../../packages/ui/package.json';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <span className="squircle flex size-7 shrink-0 items-center justify-center rounded-chip bg-accent text-xs font-bold text-accent-foreground">
            C
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate">{appName}</span>
            <span className="truncate text-[0.6875rem] font-normal text-muted">design system · v{uiVersion}</span>
          </span>
        </>
      ),
      url: '/docs',
    },
    themeSwitch: { enabled: false },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
