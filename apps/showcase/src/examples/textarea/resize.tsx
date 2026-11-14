import { Textarea } from '@crazy-staff/ui';

export default function TextareaResize() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      <Textarea aria-label="Drag to resize" placeholder="Drag the grip, or focus it and press ↑ ↓." />
      <Textarea aria-label="Fixed height" resize="none" placeholder="resize=&quot;none&quot;: fixed height." />
    </div>
  );
}
