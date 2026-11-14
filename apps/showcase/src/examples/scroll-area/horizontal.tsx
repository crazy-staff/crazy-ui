import { ScrollArea } from '@crazy-staff/ui';

const places = ['Old Camp', 'New Camp', 'Swamp Camp', 'Free Mine', 'Old Mine', 'Monastery ruins', 'Orc city', 'Sleeper’s temple', 'Xardas’ tower', 'Abandoned mine'];

export default function ScrollAreaHorizontal() {
  return (
    <div className="squircle w-full max-w-xl rounded-card border border-border bg-surface">
      <ScrollArea orientation="horizontal">
        <div className="flex w-max gap-3 p-4">
          {places.map((place, i) => (
            <figure key={place} className="flex w-36 shrink-0 flex-col gap-2">
              <div
                className="squircle aspect-[4/3] rounded-control"
                style={{ background: `linear-gradient(160deg, hsl(${200 + i * 18} 45% 70%), hsl(${230 + i * 18} 40% 32%))` }}
              />
              <figcaption className="truncate text-xs text-muted">{place}</figcaption>
            </figure>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
