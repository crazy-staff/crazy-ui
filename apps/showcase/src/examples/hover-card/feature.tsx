import { Chip, HoverCard } from '@crazy-staff/ui';
import { Sparkles } from 'lucide-react';

export default function HoverCardFeature() {
  return (
    <p className="max-w-md text-center text-sm text-muted">
      Combine{' '}
      <HoverCard
        side="top"
        trigger={
          <a href="#infinite-mana" className="font-medium text-foreground underline decoration-dotted underline-offset-4">
            Infinite mana
          </a>
        }
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-semibold">
            <Sparkles className="size-4 text-accent-soft-foreground" /> Infinite mana
            <Chip size="sm" variant="success" className="ms-auto">
              verified
            </Chip>
          </div>
          <p className="text-muted">Keeps the mana pool full. Works with runes and scrolls since build 0.9.</p>
          <span className="text-xs text-muted">Hotkey: F2</span>
        </div>
      </HoverCard>{' '}
      with the fire rain rune for a very short fight.
    </p>
  );
}
