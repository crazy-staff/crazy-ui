import { Resizable } from '@crazy-staff/ui';

export default function ResizableVertical() {
  return (
    <Resizable.Group orientation="vertical" className="squircle h-72 w-full max-w-md overflow-hidden rounded-card border border-border bg-surface">
      <Resizable.Panel defaultSize="60">
        <div className="flex h-full items-center justify-center p-6 text-sm">Map of the Valley of Mines</div>
      </Resizable.Panel>
      <Resizable.Handle withHandle />
      <Resizable.Panel minSize="20">
        <div className="flex h-full items-center justify-center p-6 text-sm text-muted">Console</div>
      </Resizable.Panel>
    </Resizable.Group>
  );
}
