import { Avatar, Button, Chip, Dialog } from '@crazy-staff/ui';

const testers = [
  { name: 'Marta Nowak', rank: 'veteran' },
  { name: 'Jan Kowalski', rank: 'tester' },
  { name: 'Ola Wiśniewska', rank: 'tester' },
];

export default function DialogCompound() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="outline" />}>View testers</Dialog.Trigger>
      <Dialog.Content size="sm" showClose={false}>
        <Dialog.Header>
          <Dialog.Title>Testers of build 0.9</Dialog.Title>
          <Dialog.Description>They get new builds a week before release.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <ul className="flex flex-col gap-3">
            {testers.map((t) => (
              <li key={t.name} className="flex items-center gap-3">
                <Avatar size="sm" name={t.name} />
                <span className="flex-1">{t.name}</span>
                <Chip size="sm" variant={t.rank === 'veteran' ? 'soft' : 'neutral'}>
                  {t.rank}
                </Chip>
              </li>
            ))}
          </ul>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close render={<Button className="w-full" />}>Close</Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}
