import { Checkbox } from '@crazy-staff/ui';

const testers = ['Diego', 'Gorn', 'Lester', 'Milten'];

export default function CheckboxCompound() {
  return (
    <ul className="flex w-full max-w-xs flex-col divide-y divide-border text-sm">
      {testers.map((name) => (
        <li key={name} className="flex items-center justify-between py-2">
          <span id={`tester-${name}`}>{name}</span>
          <Checkbox.Root aria-labelledby={`tester-${name}`} defaultChecked={name !== 'Lester'}>
            <Checkbox.Indicator />
          </Checkbox.Root>
        </li>
      ))}
    </ul>
  );
}
