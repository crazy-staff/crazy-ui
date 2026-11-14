import { Chip } from '@crazy-staff/ui';

export default function ChipSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Chip size="sm">small</Chip>
      <Chip size="md">medium</Chip>
    </div>
  );
}
