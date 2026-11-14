import { Prose } from '@crazy-staff/ui';

export default function TypographySizes() {
  return (
    <div className="grid w-full gap-8 md:grid-cols-2">
      <Prose size="sm">
        <h3>Small</h3>
        <p>For side panels and changelog entries. The trainer saves settings per save file.</p>
      </Prose>
      <Prose size="lg">
        <h3>Large</h3>
        <p>For landing pages. The trainer saves settings per save file.</p>
      </Prose>
    </div>
  );
}
