import { Button, HoverCard } from '@crazy-staff/ui';

const sides = ['top', 'right', 'bottom', 'left'] as const;

export default function HoverCardSides() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {sides.map((side) => (
        <HoverCard key={side} side={side} delay={200} className="w-60" trigger={<Button variant="outline">{side}</Button>}>
          <p className="text-muted">Opens on the {side}, and flips when there is no room.</p>
        </HoverCard>
      ))}
    </div>
  );
}
