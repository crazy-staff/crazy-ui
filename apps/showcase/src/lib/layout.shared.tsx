import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <span className="squircle flex size-7 shrink-0 items-center justify-center rounded-chip bg-accent text-xs font-bold text-accent-foreground">
            C
          </span>
          <span className="truncate">{appName}</span>
        </>
      ),
      url: '/docs',
    },
    themeSwitch: { enabled: false },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
