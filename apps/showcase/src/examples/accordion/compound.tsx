import { Accordion, Chip } from '@crazy-staff/ui';
import { Bug, Lightbulb } from 'lucide-react';

export default function AccordionCompound() {
  return (
    <Accordion.Root className="max-w-xl">
      <Accordion.Item value="idea">
        <Accordion.Trigger>
          <span className="flex items-center gap-3">
            <Lightbulb className="size-4 text-accent-soft-foreground" />
            Save teleport markers between sessions
          </span>
          <Chip size="sm" className="ms-auto">128 votes</Chip>
        </Accordion.Trigger>
        <Accordion.Panel>Markers are lost when you load a save. Keep them in the trainer’s settings file instead.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="bug">
        <Accordion.Trigger>
          <span className="flex items-center gap-3">
            <Bug className="size-4 text-danger" />
            Meteors crash the game in the Old Camp
          </span>
          <Chip size="sm" variant="danger" className="ms-auto">crashes</Chip>
        </Accordion.Trigger>
        <Accordion.Panel>Happens on build 0.9 when more than five meteors land near the castle.</Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
}
