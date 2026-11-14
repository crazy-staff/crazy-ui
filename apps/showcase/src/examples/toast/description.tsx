import { Button, toast } from '@crazy-staff/ui';

export default function ToastDescription() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.success('Idea posted', {
          description: '“Save teleport markers per save file” is now on the board. Testers can vote on it.',
        })
      }
    >
      Post idea
    </Button>
  );
}
