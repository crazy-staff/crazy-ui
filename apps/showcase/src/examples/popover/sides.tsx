import { Button, Popover } from '@crazy-staff/ui';

const sides = ['top', 'right', 'bottom', 'left'] as const;

export default function PopoverSides() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {sides.map((side) => (
        <Popover
          key={side}
          side={side}
          trigger={<Button variant="outline">{side}</Button>}
          title={`Opens on the ${side}`}
          description="Flips to the other side when there is no room."
          className="w-60"
        />
      ))}
    </div>
  );
}
