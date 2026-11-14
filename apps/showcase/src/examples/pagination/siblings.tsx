import { Pagination } from '@crazy-staff/ui';
import { useState } from 'react';

export default function PaginationSiblings() {
  const [page, setPage] = useState(12);
  return <Pagination page={page} total={40} siblings={2} onPageChange={setPage} />;
}
