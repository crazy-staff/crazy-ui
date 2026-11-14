import { Button, Checkbox, Field, Select, Textarea } from '@crazy-staff/ui';
import { useState } from 'react';

export default function FieldForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="flex w-full max-w-md flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <Field label="Title" required validationMode="onBlur" error="Give your idea a title." errorMatch="valueMissing">
        <Field.Control name="title" required placeholder="Teleport to the last bookmark" />
      </Field>
      <Field label="Category">
        <Select
          name="category"
          className="w-full"
          defaultValue="trainer"
          items={[
            { value: 'trainer', label: 'Trainer feature' },
            { value: 'hub', label: 'crazy-hub' },
            { value: 'docs', label: 'Docs' },
          ]}
        />
      </Field>
      <Field label="Details" description="Markdown works.">
        <Field.Control render={<Textarea name="details" autoResize rows={3} className="max-h-60" />} />
      </Field>
      <Checkbox name="notify" defaultChecked label="Email me when someone votes" />
      <div className="flex items-center justify-end gap-3">
        {sent && <span className="text-sm text-muted">Posted. Thanks!</span>}
        <Button type="submit">Post idea</Button>
      </div>
    </form>
  );
}
