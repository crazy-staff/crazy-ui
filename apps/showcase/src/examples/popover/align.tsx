import { Button, Popover } from '@crazy-staff/ui';

const aligns = ['start', 'center', 'end'] as const;

export default function PopoverAlign() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {aligns.map((align) => (
        <Popover
          key={align}
          align={align}
          trigger={
            <Button variant="outline" className="w-36">
              align="{align}"
            </Button>
          }
          title={`Aligned to the ${align}`}
          className="w-56"
        />
      ))}
    </div>
  );
}
