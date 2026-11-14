import { Button, Sheet } from '@crazy-staff/ui';

const sides = ['top', 'right', 'bottom', 'left'] as const;

export default function SheetSides() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {sides.map((side) => (
        <Sheet
          key={side}
          side={side}
          trigger={<Button variant="outline">{side}</Button>}
          title={`From the ${side}`}
          description="The panel floats a little away from the window edge, like the docs page itself."
        />
      ))}
    </div>
  );
}
