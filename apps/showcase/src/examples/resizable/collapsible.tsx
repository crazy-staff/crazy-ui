import { Resizable } from '@crazy-staff/ui';

export default function ResizableCollapsible() {
  return (
    <Resizable.Group className="squircle h-56 w-full max-w-xl overflow-hidden rounded-card border border-border bg-surface">
      <Resizable.Panel defaultSize="30" minSize="20" collapsible collapsedSize="0">
        <div className="flex h-full items-center justify-center p-6 text-sm text-muted">Filters</div>
      </Resizable.Panel>
      <Resizable.Handle withHandle />
      <Resizable.Panel>
        <div className="flex h-full items-center justify-center p-6 text-sm">Drag the handle to the left edge to collapse the filters.</div>
      </Resizable.Panel>
    </Resizable.Group>
  );
}
