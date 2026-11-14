import { Resizable } from '@crazy-staff/ui';

export default function ResizableDefault() {
  return (
    <Resizable.Group className="squircle h-64 w-full max-w-xl overflow-hidden rounded-card border border-border bg-surface">
      <Resizable.Panel defaultSize="35" minSize="20">
        <div className="flex h-full items-center justify-center p-6 text-sm text-muted">Features</div>
      </Resizable.Panel>
      <Resizable.Handle withHandle />
      <Resizable.Panel minSize="30">
        <div className="flex h-full items-center justify-center p-6 text-sm">God mode</div>
      </Resizable.Panel>
    </Resizable.Group>
  );
}
