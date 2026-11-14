import { Pagination } from '@crazy-staff/ui';
import { useState } from 'react';

export default function PaginationCompact() {
  const [page, setPage] = useState(3);
  return <Pagination page={page} total={12} labels={false} onPageChange={setPage} />;
}
