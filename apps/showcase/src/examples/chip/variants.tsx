import { Chip } from '@crazy-staff/ui';

export default function ChipVariants() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Chip>soft</Chip>
      <Chip variant="solid">solid</Chip>
      <Chip variant="outline">outline</Chip>
      <Chip variant="neutral">neutral</Chip>
    </div>
  );
}
