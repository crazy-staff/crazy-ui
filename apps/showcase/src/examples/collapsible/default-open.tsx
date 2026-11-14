import { Collapsible } from '@crazy-staff/ui';

export default function CollapsibleDefaultOpen() {
  return (
    <Collapsible title="Known issues in 0.9" defaultOpen className="w-full max-w-sm">
      <ul className="flex list-disc flex-col gap-1.5 ps-8 pt-2 text-sm text-muted">
        <li>Meteors crash the game in the Old Camp.</li>
        <li>Polymorph can leave the hero stuck.</li>
      </ul>
    </Collapsible>
  );
}
