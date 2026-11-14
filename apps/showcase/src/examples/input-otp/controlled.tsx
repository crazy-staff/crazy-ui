import { Button, InputOTP } from '@crazy-staff/ui';
import { useState } from 'react';

export default function InputOTPControlled() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'ok' | 'wrong'>('idle');
  return (
    <div className="flex flex-col items-center gap-3">
      <InputOTP
        length={6}
        groups={[3, 3]}
        value={code}
        onValueChange={(v) => {
          setCode(v);
          setStatus('idle');
        }}
        onValueComplete={(v) => setStatus(v === '123456' ? 'ok' : 'wrong')}
        aria-label="Two-factor code"
      />
      <p className="text-sm text-muted">
        {status === 'ok' ? 'Signed in.' : status === 'wrong' ? 'Wrong code. Try 123456.' : `${code.length} of 6 digits`}
      </p>
      <Button size="sm" variant="ghost" onClick={() => setCode('')}>
        Clear
      </Button>
    </div>
  );
}
