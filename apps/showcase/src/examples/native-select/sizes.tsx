import { NativeSelect } from '@crazy-staff/ui';

const options = [
  { value: '30', label: '30 FPS' },
  { value: '60', label: '60 FPS' },
  { value: '144', label: '144 FPS' },
];

export default function NativeSelectSizes() {
  return (
    <div className="flex w-56 flex-col gap-3">
      <NativeSelect size="sm" aria-label="Small" options={options} />
      <NativeSelect size="md" aria-label="Medium" options={options} />
      <NativeSelect size="lg" aria-label="Large" options={options} />
    </div>
  );
}
