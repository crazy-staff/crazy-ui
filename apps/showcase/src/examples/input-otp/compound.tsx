import { InputOTP } from '@crazy-staff/ui';

export default function InputOTPCompound() {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="pairing-code" className="text-sm font-medium">
        Pairing code
      </label>
      <InputOTP.Root id="pairing-code" length={4} mask>
        <InputOTP.Group className="gap-0">
          <InputOTP.Slot className="rounded-e-none" />
          <InputOTP.Slot className="-ms-px rounded-none" aria-label="Character 2 of 4" />
          <InputOTP.Slot className="-ms-px rounded-none" aria-label="Character 3 of 4" />
          <InputOTP.Slot className="-ms-px rounded-s-none" aria-label="Character 4 of 4" />
        </InputOTP.Group>
      </InputOTP.Root>
    </div>
  );
}
