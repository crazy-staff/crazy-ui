import { Skeleton } from '@crazy-staff/ui';

/** Shown in the page panel while the next page loads. */
export function PageSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4 pt-6" aria-busy="true" aria-label="Loading page">
      <Skeleton className="block h-9 w-56" />
      <Skeleton className="block h-5 w-full max-w-lg" />
      <Skeleton className="block mt-8 h-44 w-full rounded-card" />
      <Skeleton className="block mt-4 h-6 w-40" />
      <Skeleton className="block h-4 w-full" />
      <Skeleton className="block h-4 w-11/12" />
      <Skeleton className="block h-4 w-4/5" />
      <Skeleton className="block mt-4 h-28 w-full rounded-card" />
    </div>
  );
}
