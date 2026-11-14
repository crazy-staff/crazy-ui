import { InputOTP } from '@crazy-staff/ui';

export default function InputOTPAlphanumeric() {
  return (
    <InputOTP
      length={8}
      groups={[4, 4]}
      validationType="alphanumeric"
      normalizeValue={(v) => v.toUpperCase()}
      slotPlaceholder="•"
      aria-label="Tester invite key"
    />
  );
}
