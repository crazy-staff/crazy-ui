import { Resizable } from '@crazy-staff/ui';

export default function ResizablePlainHandle() {
  return (
    <Resizable.Group className="squircle h-48 w-full max-w-xl overflow-hidden rounded-card border border-border bg-surface">
      <Resizable.Panel defaultSize="50">
        <div className="flex h-full items-center justify-center p-6 text-sm">Before</div>
      </Resizable.Panel>
      <Resizable.Handle />
      <Resizable.Panel defaultSize="50">
        <div className="flex h-full items-center justify-center p-6 text-sm">After</div>
      </Resizable.Panel>
    </Resizable.Group>
  );
}
