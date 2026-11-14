import { Resizable } from '@crazy-staff/ui';

export default function ResizableNested() {
  return (
    <Resizable.Group className="squircle h-80 w-full max-w-2xl overflow-hidden rounded-card border border-border bg-surface">
      <Resizable.Panel defaultSize="25" minSize="15">
        <div className="flex h-full items-center justify-center p-6 text-sm text-muted">Sidebar</div>
      </Resizable.Panel>
      <Resizable.Handle />
      <Resizable.Panel>
        <Resizable.Group orientation="vertical">
          <Resizable.Panel defaultSize="65">
            <div className="flex h-full items-center justify-center p-6 text-sm">Post</div>
          </Resizable.Panel>
          <Resizable.Handle />
          <Resizable.Panel>
            <div className="flex h-full items-center justify-center p-6 text-sm text-muted">Comments</div>
          </Resizable.Panel>
        </Resizable.Group>
      </Resizable.Panel>
    </Resizable.Group>
  );
}
