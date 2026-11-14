import { Pagination } from '@crazy-staff/ui';
import { useState } from 'react';

export default function PaginationFewPages() {
  const [page, setPage] = useState(2);
  return <Pagination page={page} total={5} onPageChange={setPage} />;
}
