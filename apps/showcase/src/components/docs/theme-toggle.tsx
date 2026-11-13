import { cn } from '@crazy-staff/ui';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const THEMES = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
] as const;

/** Light / dark / system in the sidebar footer (as in crazy-hub). */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div role="radiogroup" aria-label="Theme" className={cn('squircle flex items-center gap-0.5 rounded-control-sm border border-border p-0.5', className)}>
      {THEMES.map((t) => {
        const active = mounted && theme === t.value;
        return (
          <button
            key={t.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={t.label}
            title={t.label}
            data-no-glide=""
            onClick={() => setTheme(t.value)}
            className={cn(
              'squircle flex size-7 items-center justify-center rounded-chip transition-colors [&_svg]:size-3.5',
              active ? 'bg-hover text-foreground' : 'text-muted hover:text-foreground',
            )}
          >
            <t.icon />
          </button>
        );
      })}
    </div>
  );
}
