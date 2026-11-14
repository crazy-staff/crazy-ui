import { AlertDialog, Button } from '@crazy-staff/ui';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function AlertDialogDestructive() {
  const [deleted, setDeleted] = useState(false);
  if (deleted) {
    return (
      <Button variant="ghost" onClick={() => setDeleted(false)}>
        Post deleted · Undo
      </Button>
    );
  }
  return (
    <AlertDialog
      trigger={
        <Button variant="danger">
          <Trash2 /> Delete post
        </Button>
      }
      title="Delete this post?"
      description="“Add a Chronicles of Myrtana build” and its 31 votes and 12 comments are removed for everyone. This can't be undone."
      actionLabel="Delete post"
      cancelLabel="Keep it"
      tone="danger"
      onAction={() => setDeleted(true)}
    />
  );
}
