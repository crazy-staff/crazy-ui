import { Combobox } from '@crazy-staff/ui';

const testers = ['Dawid', 'Diego', 'Gorn', 'Lester', 'Milten', 'Xardas'];

export default function ComboboxEmpty() {
  return (
    <Combobox
      items={testers}
      placeholder="Assign a tester…"
      aria-label="Tester"
      emptyText="No tester with that name. Invite them first."
      className="w-72"
    />
  );
}
