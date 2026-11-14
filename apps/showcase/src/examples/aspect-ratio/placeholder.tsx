import { AspectRatio } from '@crazy-staff/ui';
import { ImageUp, Map } from 'lucide-react';

export default function AspectRatioPlaceholder() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-[2fr_1fr]">
      <AspectRatio ratio={16 / 9} rounded className="glow border border-border bg-surface-2">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm text-muted">
          <Map className="size-5" />
          Map of the colony loads here
        </div>
      </AspectRatio>
      <AspectRatio ratio={1} rounded className="glow border border-border bg-surface-2">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm text-muted">
          <ImageUp className="size-5" />
          Add a screenshot
        </div>
      </AspectRatio>
    </div>
  );
}
