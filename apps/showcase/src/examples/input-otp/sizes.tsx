import { InputOTP } from '@crazy-staff/ui';

export default function InputOTPSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      <InputOTP size="sm" length={4} aria-label="Small PIN" />
      <InputOTP size="md" length={4} aria-label="Medium PIN" />
      <InputOTP size="lg" length={4} aria-label="Large PIN" />
    </div>
  );
}
