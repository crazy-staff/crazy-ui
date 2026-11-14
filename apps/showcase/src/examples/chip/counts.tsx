import { Chip } from '@crazy-staff/ui';

const tabs = [
  { label: 'Ideas', count: 128 },
  { label: 'Planned', count: 14 },
  { label: 'In progress', count: 3 },
];

export default function ChipCounts() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5 text-sm">
      {tabs.map((t) => (
        <span key={t.label} className="flex items-center gap-2">
          {t.label}
          <Chip size="sm" variant="neutral">
            {t.count}
          </Chip>
        </span>
      ))}
    </div>
  );
}
