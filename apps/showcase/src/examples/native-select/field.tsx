import { Label, NativeSelect } from '@crazy-staff/ui';

export default function NativeSelectField() {
  return (
    <div className="flex w-64 flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ns-language">Menu language</Label>
        <NativeSelect
          id="ns-language"
          defaultValue="pl"
          options={[
            { value: 'en', label: 'English' },
            { value: 'pl', label: 'Polski' },
            { value: 'de', label: 'Deutsch' },
            { value: 'ru', label: 'Русский' },
          ]}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ns-locked" disabled>
          Difficulty
        </Label>
        <NativeSelect id="ns-locked" disabled options={[{ value: 'normal', label: 'Normal (set by the save)' }]} />
      </div>
      <NativeSelect aria-label="Required" aria-invalid required placeholder="Required field" defaultValue="" options={[{ value: 'a', label: 'Option' }]} />
    </div>
  );
}
