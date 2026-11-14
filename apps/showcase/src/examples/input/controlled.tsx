import { Input } from '@crazy-staff/ui';
import { useState } from 'react';

export default function InputControlled() {
  const [title, setTitle] = useState('Add a weather switch');
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Input value={title} maxLength={60} onChange={(e) => setTitle(e.target.value)} aria-label="Post title" />
      <p className="text-end text-xs text-muted tabular-nums">{title.length}/60</p>
    </div>
  );
}
