import { Textarea } from '@crazy-staff/ui';

export default function TextareaAutoResize() {
  return (
    <Textarea
      autoResize
      rows={2}
      className="max-h-64"
      classNames={{ root: 'max-w-md' }}
      aria-label="Changelog entry"
      defaultValue={'Teleports now keep the camera angle.\nFixed the arena crash.'}
    />
  );
}
