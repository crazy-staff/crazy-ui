import { AlertDialog, Button } from '@crazy-staff/ui';

export default function AlertDialogDefault() {
  return (
    <AlertDialog
      trigger={<Button variant="outline">Reset settings</Button>}
      title="Reset all settings?"
      description="Hotkeys, language and menu position go back to their defaults. Your kits and markers stay."
      actionLabel="Reset"
    />
  );
}
