import { Accordion } from '@crazy-staff/ui';

export default function AccordionPlain() {
  return (
    <Accordion
      variant="plain"
      className="max-w-xl"
      items={[
        { value: 'vote', title: 'How do votes work?', content: 'Every account gets one vote per idea. Testers’ votes count double.' },
        { value: 'roadmap', title: 'When does an idea reach the roadmap?', content: 'Once the team plans it, the idea moves to “Planned” and you get a notification.' },
        { value: 'ranks', title: 'How do I become a tester?', content: 'Report three verified bugs and ask for the tester rank in your profile.' },
      ]}
    />
  );
}
