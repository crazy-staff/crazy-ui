import { Typography } from '@crazy-staff/ui';

export default function TypographyLists() {
  return (
    <div className="grid w-full max-w-xl gap-6 sm:grid-cols-2">
      <Typography.List>
        <li>God mode</li>
        <li>Infinite mana</li>
        <li>Teleport</li>
      </Typography.List>
      <Typography.List render={<ol />}>
        <li>Download the build</li>
        <li>Copy the DLL</li>
        <li>Press F8 in game</li>
      </Typography.List>
    </div>
  );
}
