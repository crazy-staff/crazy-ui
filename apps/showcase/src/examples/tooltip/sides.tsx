import { Button, Tooltip } from '@crazy-staff/ui';

const sides = ['top', 'right', 'bottom', 'left'] as const;

export default function TooltipSides() {
  return (
    <Tooltip.Provider>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {sides.map((side) => (
          <Tooltip key={side} side={side} content={`Opens on the ${side}`}>
            <Button variant="outline">{side}</Button>
          </Tooltip>
        ))}
      </div>
    </Tooltip.Provider>
  );
}
