import { Button, Tooltip } from '@crazy-staff/ui';

const aligns = ['start', 'center', 'end'] as const;

export default function TooltipAlign() {
  return (
    <Tooltip.Provider>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {aligns.map((align) => (
          <Tooltip key={align} side="bottom" align={align} content={`Aligned to the ${align}`}>
            <Button variant="outline" className="w-36">
              align="{align}"
            </Button>
          </Tooltip>
        ))}
      </div>
    </Tooltip.Provider>
  );
}
