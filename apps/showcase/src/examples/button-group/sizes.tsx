import { Button, ButtonGroup } from '@crazy-staff/ui';

export default function ButtonGroupSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <ButtonGroup key={size} aria-label={`Export (${size})`}>
          <Button variant="outline" size={size}>
            JSON
          </Button>
          <Button variant="outline" size={size}>
            CSV
          </Button>
          <Button variant="outline" size={size}>
            Markdown
          </Button>
        </ButtonGroup>
      ))}
    </div>
  );
}
