import { ChoiceField } from '@crazy-staff/ui';
import { useState } from 'react';

const languages = [
  { value: 'en', label: 'English', lang: 'en' },
  { value: 'pl', label: 'Polski', lang: 'pl' },
  { value: 'de', label: 'Deutsch', lang: 'de' },
  { value: 'ru', label: 'Русский', lang: 'ru' },
];

/** Drag the box narrower: when the toggle no longer fits, it becomes the button. */
export default function ChoiceFieldNarrow() {
  const [lang, setLang] = useState('pl');
  return (
    <div className="w-full max-w-[28rem] min-w-40 resize-x overflow-hidden rounded-control border border-dashed border-border p-3">
      <ChoiceField label="Language" value={lang} onValueChange={setLang} choices={languages} />
    </div>
  );
}
