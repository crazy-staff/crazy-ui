import { Textarea } from '@crazy-staff/ui';
import { useState } from 'react';

const LIMIT = 280;

export default function TextareaControlled() {
  const [text, setText] = useState('');
  return (
    <div className="flex w-full max-w-md flex-col gap-1.5">
      <Textarea
        autoResize
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, LIMIT))}
        aria-label="Comment"
        placeholder="Write a comment…"
      />
      <p className="text-end text-xs text-muted tabular-nums">{LIMIT - text.length} left</p>
    </div>
  );
}
