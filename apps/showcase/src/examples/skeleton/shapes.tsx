import { Skeleton } from '@crazy-staff/ui';

export default function SkeletonShapes() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Skeleton shape="line" className="w-32" />
      <Skeleton shape="block" className="h-control w-28" />
      <Skeleton shape="circle" className="size-12" />
      <Skeleton shape="card" className="h-24 w-40" />
    </div>
  );
}
