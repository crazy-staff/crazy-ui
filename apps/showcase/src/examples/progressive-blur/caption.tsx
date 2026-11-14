import { AspectRatio, ProgressiveBlur } from '@crazy-staff/ui';

function scene(hue: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl(${hue} 55% 78%)"/><stop offset="1" stop-color="hsl(${hue + 25} 60% 90%)"/></linearGradient></defs><rect width="160" height="90" fill="url(#s)"/><circle cx="118" cy="26" r="10" fill="#fff" fill-opacity=".75"/><path d="M0 62 28 40l18 12 26-24 30 26 22-14 36 22v28H0z" fill="hsl(${hue + 10} 35% 55%)"/><path d="M0 74 34 56l24 12 30-16 32 18 40-12v32H0z" fill="hsl(${hue + 20} 40% 34%)"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default function ProgressiveBlurCaption() {
  return (
    <AspectRatio ratio={16 / 9} rounded className="relative max-w-lg border border-border">
      <img src={scene(250)} alt="The valley below the Old Camp at dusk" />
      <ProgressiveBlur className="rounded-b-[inherit]" side="bottom" size="50%" strength={12} tint="oklch(from var(--cui-background) l c h / 0.7)" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-foreground">
        <p className="text-sm font-semibold">The Old Camp at dusk</p>
        <p className="text-xs text-muted">Screenshot from tester Diego, build 0.9.1</p>
      </div>
    </AspectRatio>
  );
}
