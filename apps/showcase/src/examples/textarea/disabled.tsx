import { Textarea } from '@crazy-staff/ui';

export default function TextareaDisabled() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Textarea disabled aria-label="Locked" defaultValue="Comments are closed on released builds." />
      <Textarea readOnly aria-label="Read only" defaultValue="Logged by the trainer: hero teleported to the Old Camp." />
    </div>
  );
}
