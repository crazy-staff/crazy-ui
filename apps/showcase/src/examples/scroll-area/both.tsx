import { ScrollArea } from '@crazy-staff/ui';

const features = ['God mode', 'Infinite mana', 'Infinite stamina', 'Teleport', 'Polymorph', 'Meteors', 'Giant hero', 'Weather', 'Time of day', 'Spawn items'];
const builds = ['0.5', '0.6', '0.7', '0.8', '0.9', '0.10', '0.11', '0.12'];

export default function ScrollAreaBoth() {
  return (
    <div className="squircle h-64 w-full max-w-md rounded-card border border-border bg-surface">
      <ScrollArea orientation="both" className="h-full">
        <table className="text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 bg-surface px-4 py-2 text-start text-xs font-medium text-muted">Feature</th>
              {builds.map((b) => (
                <th key={b} className="px-4 py-2 text-xs font-medium whitespace-nowrap text-muted">
                  Build {b}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((f, i) => (
              <tr key={f}>
                <td className="sticky left-0 bg-surface px-4 py-2 whitespace-nowrap">{f}</td>
                {builds.map((b, j) => (
                  <td key={b} className="px-4 py-2 text-center text-muted">
                    {(i + j) % 4 === 0 ? '–' : '✓'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
}
