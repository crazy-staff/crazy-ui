import { Alert } from '@crazy-staff/ui';

export default function AlertCompound() {
  return (
    <Alert className="max-w-lg" variant="warning">
      <Alert.Title>Save before you try this</Alert.Title>
      <Alert.Description>Polymorph is still marked as “works badly” in the last test report.</Alert.Description>
    </Alert>
  );
}
