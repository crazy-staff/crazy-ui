import { InputOTP } from '@crazy-staff/ui';
import { Dot } from 'lucide-react';

export default function InputOTPSeparator() {
  return (
    <div className="flex flex-col items-center gap-4">
      <InputOTP length={6} aria-label="Code without groups" />
      <InputOTP length={6} groups={[2, 2, 2]} separator={<Dot />} aria-label="Code in pairs" />
    </div>
  );
}
