import { Avatar } from '@crazy-staff/ui';

function portrait(hue: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue} 75% 74%)"/><stop offset="1" stop-color="hsl(${hue + 35} 55% 46%)"/></linearGradient></defs><rect width="64" height="64" fill="url(#g)"/><circle cx="32" cy="25" r="11" fill="#fff" fill-opacity=".82"/><path d="M10 64c0-14 10-22 22-22s22 8 22 22z" fill="#fff" fill-opacity=".82"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const voters = [
  { name: 'Diego', hue: 250 },
  { name: 'Milten', hue: 200 },
  { name: 'Gorn', hue: 150 },
  { name: 'Lester', hue: 30 },
];

export default function AvatarGroup() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {voters.map((v) => (
          <Avatar key={v.name} src={portrait(v.hue)} name={v.name} className="ring-2 ring-surface" />
        ))}
        <Avatar.Root className="ring-2 ring-surface">
          <Avatar.Fallback>+124</Avatar.Fallback>
        </Avatar.Root>
      </div>
      <span className="text-sm text-muted">voted for this idea</span>
    </div>
  );
}
