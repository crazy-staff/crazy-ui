import { Field, InputOTP } from '@crazy-staff/ui';

export default function InputOTPDefault() {
  return (
    <Field label="Verification code" description="Enter the 6-digit code we sent to your email.">
      <InputOTP length={6} groups={[3, 3]} />
    </Field>
  );
}
