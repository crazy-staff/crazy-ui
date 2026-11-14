import { Accordion } from '@crazy-staff/ui';

export default function AccordionDefault() {
  return (
    <Accordion
      className="max-w-xl"
      defaultValue={['install']}
      items={[
        {
          value: 'install',
          title: 'How do I install the trainer?',
          content: 'Copy the files into the Gothic folder and start the game. The menu opens with F1.',
        },
        {
          value: 'steam',
          title: 'Does it work with the Steam version?',
          content: 'Yes — Gothic 1 from Steam with the GD3D11 renderer. Other versions come later.',
        },
        {
          value: 'saves',
          title: 'Will it break my saves?',
          content: 'No. Cheats only change the running game, so your saves stay compatible without it.',
        },
      ]}
    />
  );
}
