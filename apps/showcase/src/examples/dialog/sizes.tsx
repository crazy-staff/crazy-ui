import { Button, Dialog } from '@crazy-staff/ui';

const sizes = ['sm', 'md', 'lg'] as const;

export default function DialogSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {sizes.map((size) => (
        <Dialog
          key={size}
          size={size}
          trigger={<Button variant="outline">size="{size}"</Button>}
          title={`A ${size} dialog`}
          description="Width grows with the size; height follows the content and scrolls when it runs out of room."
          footer={<Dialog.Close render={<Button />}>Got it</Dialog.Close>}
        />
      ))}
    </div>
  );
}
