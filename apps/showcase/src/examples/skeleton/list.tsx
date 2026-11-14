import { Skeleton } from '@crazy-staff/ui';

export default function SkeletonList() {
  return (
    <div className="squircle flex w-full max-w-md flex-col divide-y divide-border rounded-card border border-border bg-surface">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3">
          <Skeleton shape="block" className="h-11 w-10" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="w-3/4" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
