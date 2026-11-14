import { Button } from '@crazy-staff/ui';

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Solid</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  );
}
