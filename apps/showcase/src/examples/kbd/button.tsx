import { Button, Kbd } from '@crazy-staff/ui';

export default function KbdButton() {
  return (
    <div className="flex items-center gap-3">
      <Button variant="outline">
        Save draft <Kbd size="sm">Ctrl S</Kbd>
      </Button>
      <Button>
        Post idea <Kbd size="sm" className="border-transparent bg-accent-foreground/10 text-accent-foreground">↵</Kbd>
      </Button>
    </div>
  );
}
