import { Chip, ProgressiveBlur } from '@crazy-staff/ui';

const features = ['God mode', 'Infinite mana', 'Teleport', 'Noclip', 'Freeze time', 'Max skills', 'All spells', 'Speed hack', 'One-hit kills'];

export default function ProgressiveBlurSides() {
  return (
    <div className="relative w-full max-w-md overflow-hidden">
      <div className="flex gap-2 overflow-x-auto px-10 py-2 [scrollbar-width:none]">
        {features.map((feature) => (
          <Chip key={feature} className="shrink-0">
            {feature}
          </Chip>
        ))}
      </div>
      <ProgressiveBlur side="left" size={48} strength={6} tint="var(--cui-surface)" />
      <ProgressiveBlur side="right" size={48} strength={6} tint="var(--cui-surface)" />
    </div>
  );
}
