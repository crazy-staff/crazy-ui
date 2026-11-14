import { Button, Empty } from '@crazy-staff/ui';
import { SearchX } from 'lucide-react';

export default function EmptySearch() {
  return (
    <Empty
      className="max-w-md"
      icon={<SearchX />}
      title="No features match “meteor shower”"
      description="Try a shorter search, or clear the filters for Gothic 1."
      action={
        <>
          <Button size="sm" variant="outline">
            Clear filters
          </Button>
          <Button size="sm" variant="ghost">
            Suggest it
          </Button>
        </>
      }
    />
  );
}
