import { AspectRatio } from '@crazy-staff/ui';
import { Play } from 'lucide-react';

/** A generated landscape: sky, a moon and two mountain ridges in one hue. */
function scene(hue: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl(${hue} 55% 78%)"/><stop offset="1" stop-color="hsl(${hue + 25} 60% 90%)"/></linearGradient></defs><rect width="160" height="90" fill="url(#s)"/><circle cx="118" cy="26" r="10" fill="#fff" fill-opacity=".75"/><path d="M0 62 28 40l18 12 26-24 30 26 22-14 36 22v28H0z" fill="hsl(${hue + 10} 35% 55%)"/><path d="M0 74 34 56l24 12 30-16 32 18 40-12v32H0z" fill="hsl(${hue + 20} 40% 34%)"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default function AspectRatioVideo() {
  return (
    <AspectRatio ratio={16 / 9} rounded className="group max-w-lg border border-border">
      <img src={scene(280)} alt="" />
      <button
        type="button"
        aria-label="Play the build 0.9 trailer"
        className="absolute inset-0 flex items-center justify-center outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-surface/85 text-foreground shadow-overlay transition-transform duration-[var(--cui-duration-fast)] ease-ui group-hover:scale-105">
          <Play className="size-5 translate-x-px" />
        </span>
      </button>
    </AspectRatio>
  );
}
