import { Avatar } from '@crazy-staff/ui';

function portrait(hue: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue} 75% 74%)"/><stop offset="1" stop-color="hsl(${hue + 35} 55% 46%)"/></linearGradient></defs><rect width="64" height="64" fill="url(#g)"/><circle cx="32" cy="25" r="11" fill="#fff" fill-opacity=".82"/><path d="M10 64c0-14 10-22 22-22s22 8 22 22z" fill="#fff" fill-opacity=".82"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default function AvatarSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <Avatar size="sm" src={portrait(200)} name="Milten" />
        <Avatar size="md" src={portrait(200)} name="Milten" />
        <Avatar size="lg" src={portrait(200)} name="Milten" />
      </div>
      <div className="flex items-center gap-4">
        <Avatar size="sm" name="Milten" />
        <Avatar size="md" name="Milten" />
        <Avatar size="lg" name="Milten" />
      </div>
    </div>
  );
}
