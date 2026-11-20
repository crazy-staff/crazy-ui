import { Button, Select, SidePanel, SidePanelButton, SidePanelSection, Switch, useSidePanel } from '@crazy-staff/ui';
import { Lock, Shield, Tag, Trash2 } from 'lucide-react';

/**
 * A moderation panel: the shield among the page's controls shows or hides it in the right column on a
 * wide screen, and opens it in a drawer with touch-size controls on a narrow one.
 */
export default function SidePanelDefault() {
  const panel = useSidePanel('docs-example', { query: '(min-width: 900px)' });
  const content = (
    <>
      <SidePanelSection label="Status" icon={<Tag />}>
        <Select
          aria-label="Status"
          defaultValue="planned"
          items={[
            { value: 'open', label: 'Open' },
            { value: 'planned', label: 'Planned' },
            { value: 'done', label: 'Done' },
          ]}
        />
      </SidePanelSection>
      <SidePanelSection label="Comments" icon={<Lock />}>
        <Switch label="Locked" />
      </SidePanelSection>
      <SidePanelSection
        label="Danger"
        icon={<Trash2 />}
        actions={
          <Button variant="ghost" size="icon-sm" aria-label="Delete idea" className="text-danger">
            <Trash2 />
          </Button>
        }
      >
        <p className="text-xs text-muted">Deleting moves the idea to the bin.</p>
      </SidePanelSection>
    </>
  );
  return (
    <div className="flex w-full gap-8">
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-center gap-2">
          <h3 className="me-auto text-lg font-semibold">Faster loading screens</h3>
          <SidePanelButton panel={panel} title="Moderation" icon={<Shield />}>
            {content}
          </SidePanelButton>
        </div>
        <p className="text-sm text-muted">The idea's text, votes and comments.</p>
        <div className="squircle h-32 rounded-card border border-border bg-background" />
      </div>
      {panel.wide && (
        <div className="w-72 shrink-0">
          <SidePanel panel={panel} title="Moderation">
            {content}
          </SidePanel>
        </div>
      )}
    </div>
  );
}
