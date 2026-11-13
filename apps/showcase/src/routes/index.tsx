import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@crazy-staff/ui';
import { Moon, Sun } from 'lucide-react';
import * as React from 'react';
import { DirectionColumn } from '@/components/round1/column';
import { directions } from '@/components/round1/data';

export const Route = createFileRoute('/')({
  component: Round1Page,
});

function useDarkToggle() {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    root.classList.toggle('light', !dark);
  }, [dark]);
  return [dark, setDark] as const;
}

function Round1Page() {
  const [dark, setDark] = useDarkToggle();

  return (
    <main
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: 'var(--cui-font-sans)' }}
    >
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-4 px-6 py-4">
          <div>
            <h1 className="font-heading text-lg font-semibold tracking-[-0.015em]">
              crazy-ui — design round 1
            </h1>
            <p className="text-xs text-muted">
              Three visual directions, one Crazy-purple accent, pure token overrides.
            </p>
          </div>
          <Button variant="outline" size="icon" onClick={() => setDark((d) => !d)} aria-label="Toggle theme">
            {dark ? <Sun /> : <Moon />}
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-[1800px] px-6 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {directions.map((d) => (
            <DirectionColumn key={d.id} direction={d} />
          ))}
        </div>
      </div>
    </main>
  );
}
