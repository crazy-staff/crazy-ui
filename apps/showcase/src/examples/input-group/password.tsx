import { Button, InputGroup } from '@crazy-staff/ui';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useState } from 'react';

export default function InputGroupPassword() {
  const [visible, setVisible] = useState(false);
  return (
    <InputGroup
      className="max-w-sm pe-1.5"
      aria-label="Password"
      type={visible ? 'text' : 'password'}
      defaultValue="sleeper-awakes"
      start={<Lock />}
      end={
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <EyeOff /> : <Eye />}
        </Button>
      }
    />
  );
}
