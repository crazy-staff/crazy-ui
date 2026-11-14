import { Avatar } from '@crazy-staff/ui';

export default function AvatarFallback() {
  return (
    <div className="flex items-center gap-3">
      <Avatar name="Dawid Seipold" />
      <Avatar name="Gorn" />
      <Avatar name="Lester the Novice" />
    </div>
  );
}
