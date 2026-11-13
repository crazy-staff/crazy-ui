import { cn } from '@crazy-staff/ui';
import { AnimatePresence, motion } from 'motion/react';
import { Boxes, Home, Palette, Settings, SlidersHorizontal } from 'lucide-react';
import * as React from 'react';

const items = [
  { icon: Home, label: 'Overview' },
  { icon: Palette, label: 'Theme' },
  { icon: Boxes, label: 'Components' },
  { icon: SlidersHorizontal, label: 'Tokens' },
  { icon: Settings, label: 'Settings' },
];

/**
 * Sidebar fragment with a highlight that glides between items on hover.
 * The pill is a single `motion` element moved with a shared `layoutId`, so it
 * animates smoothly from one row to the next instead of fading in place.
 */
export function SidebarFragment({ uid }: { uid: string }) {
  const [active, setActive] = React.useState(0);
  const [hover, setHover] = React.useState<number | null>(null);
  const shown = hover ?? active;

  return (
    <nav
      className="flex flex-col gap-0.5 rounded-card border border-border bg-surface p-2 shadow-card"
      onMouseLeave={() => setHover(null)}
    >
      {items.map((item, i) => {
        const isShown = shown === i;
        return (
          <button
            key={item.label}
            type="button"
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onClick={() => setActive(i)}
            className={cn(
              'relative flex items-center gap-2.5 rounded-item px-3 py-2 text-sm outline-none',
              'transition-colors duration-[var(--cui-duration-fast)] ease-ui',
              'focus-visible:ring-2 focus-visible:ring-ring',
              isShown ? 'text-accent-soft-foreground' : 'text-muted hover:text-foreground',
            )}
          >
            {isShown && (
              <motion.span
                layoutId={`glide-${uid}`}
                className="absolute inset-0 -z-0 rounded-item bg-accent-soft"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <item.icon className="relative z-10 size-4 shrink-0" />
            <span className="relative z-10 font-[weight:var(--cui-control-weight)]">
              {item.label}
            </span>
            <AnimatePresence>
              {active === i && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="relative z-10 ml-auto size-1.5 rounded-full bg-accent"
                />
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </nav>
  );
}
