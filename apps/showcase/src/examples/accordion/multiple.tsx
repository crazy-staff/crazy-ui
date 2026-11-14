import { Accordion } from '@crazy-staff/ui';

export default function AccordionMultiple() {
  return (
    <Accordion
      multiple
      defaultValue={['character', 'world']}
      className="max-w-xl"
      items={[
        { value: 'character', title: 'Character', content: 'God mode, infinite mana, infinite stamina, set level.' },
        { value: 'world', title: 'World', content: 'Time of day, weather, teleports.' },
        { value: 'fun', title: 'Fun', content: 'Polymorph, meteors, giant hero.' },
      ]}
    />
  );
}
