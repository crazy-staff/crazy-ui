import { Accordion } from '@crazy-staff/ui';

export default function AccordionDisabled() {
  return (
    <Accordion
      className="max-w-xl"
      items={[
        { value: 'gothic-1', title: 'Gothic 1', content: 'Steam version, GD3D11 renderer. 31 features.' },
        { value: 'gothic-2', title: 'Gothic 2 — coming later', content: null, disabled: true },
      ]}
    />
  );
}
