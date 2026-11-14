import { Skeleton } from '@crazy-staff/ui';

export default function SkeletonDefault() {
  return (
    <div className="squircle flex w-full max-w-sm flex-col gap-4 rounded-card border border-border bg-surface p-5">
      <div className="flex items-center gap-3">
        <Skeleton shape="circle" className="size-9" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton lines={3} />
      <Skeleton shape="block" className="h-8 w-24" />
    </div>
  );
}
