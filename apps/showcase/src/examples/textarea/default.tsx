import { Textarea } from '@crazy-staff/ui';

export default function TextareaDefault() {
  return <Textarea classNames={{ root: 'max-w-md' }} aria-label="Bug report" placeholder="What happened, and what did you expect?" />;
}
