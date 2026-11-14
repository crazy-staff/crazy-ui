import { Skeleton } from '@crazy-staff/ui';

export default function SkeletonLines() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton lines={4} />
    </div>
  );
}
