import { Avatar, Button, Skeleton } from '@crazy-staff/ui';
import { useEffect, useState } from 'react';

export default function SkeletonLoading() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, [loading]);
  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-4">
      <div className="flex w-full items-center gap-3">
        {loading ? <Skeleton shape="circle" className="size-9" /> : <Avatar name="Diego" />}
        <div className="flex flex-1 flex-col gap-2">
          {loading ? (
            <>
              <Skeleton className="w-1/2" />
              <Skeleton className="h-3 w-1/3" />
            </>
          ) : (
            <>
              <span className="text-sm font-medium leading-3.5">Diego</span>
              <span className="text-xs leading-3 text-muted">Tester since build 0.5</span>
            </>
          )}
        </div>
      </div>
      <Button size="sm" variant="outline" onClick={() => setLoading(true)} disabled={loading}>
        Reload
      </Button>
    </div>
  );
}
