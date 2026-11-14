import { Button, Pagination } from '@crazy-staff/ui';
import { useState } from 'react';

export default function PaginationJump() {
  const [page, setPage] = useState(1);
  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination page={page} total={60} onPageChange={setPage} />
      <div className="flex flex-wrap justify-center gap-2">
        {[1, 17, 30, 60].map((p) => (
          <Button key={p} size="sm" variant={p === page ? 'soft' : 'outline'} onClick={() => setPage(p)}>
            Go to {p}
          </Button>
        ))}
      </div>
    </div>
  );
}
