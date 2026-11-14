import { Pagination } from '@crazy-staff/ui';
import { useState } from 'react';

export default function PaginationDefault() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} total={20} onPageChange={setPage} />;
}
