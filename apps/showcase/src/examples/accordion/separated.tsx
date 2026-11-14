import { Accordion } from '@crazy-staff/ui';

export default function AccordionSeparated() {
  return (
    <Accordion
      variant="separated"
      className="max-w-xl"
      items={[
        { value: 'god', title: 'God mode', content: 'The hero takes no damage from monsters, falls or magic.' },
        { value: 'mana', title: 'Infinite mana', content: 'Mana refills after every spell. Works with scrolls and runes.' },
        { value: 'teleport', title: 'Teleport', content: 'Jump to any camp, or save your own markers on the map.' },
      ]}
    />
  );
}
