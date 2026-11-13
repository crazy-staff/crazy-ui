import {
  AlertDialog,
  Button,
  Chip,
  ContextMenu,
  Dialog,
  Drawer,
  DropdownMenu,
  HoverCard,
  Input,
  Popover,
  Sheet,
  Switch,
  Toaster,
  Tooltip,
  toast,
} from '@crazy-staff/ui';
import { Copy, Download, Eye, LogOut, Pencil, Settings, SlidersHorizontal, Trash2, User } from 'lucide-react';
import { useState } from 'react';

export function TooltipDemo() {
  return (
    <Tooltip.Provider>
      <div className="flex flex-wrap items-center gap-2.5">
        <Tooltip content="Copy link">
          <Button size="icon" variant="outline" aria-label="Copy link">
            <Copy />
          </Button>
        </Tooltip>
        <Tooltip content="Download build" side="bottom">
          <Button size="icon" variant="outline" aria-label="Download build">
            <Download />
          </Button>
        </Tooltip>
        <Tooltip content="Show hidden NPCs through walls" side="right">
          <Button variant="soft">
            <Eye /> ESP
          </Button>
        </Tooltip>
      </div>
    </Tooltip.Provider>
  );
}

export function PopoverDemo() {
  const [esp, setEsp] = useState(true);
  return (
    <Popover trigger={<Button variant="outline">
        <SlidersHorizontal /> Filters
      </Button>} title="Filters" description="Narrow down the feature list.">
      <div className="mt-4 flex flex-col gap-3">
        <Input size="sm" placeholder="Search…" />
        <label className="flex items-center justify-between text-sm">
          Only verified
          <Switch size="sm" checked={esp} onCheckedChange={setEsp} aria-label="Only verified" />
        </label>
      </div>
    </Popover>
  );
}

export function DialogDemo() {
  return (
    <Dialog
      trigger={<Button>
          <Pencil /> Edit kit
        </Button>}
      title="Edit kit"
      description="Rename the kit and choose what it spawns."
      footer={
        <>
          <Dialog.Close render={<Button variant="outline" />}>Cancel</Dialog.Close>
          <Dialog.Close render={<Button />}>Save</Dialog.Close>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        <Input defaultValue="Warrior starter" />
        <Input placeholder="Description (optional)" />
      </div>
    </Dialog>
  );
}

export function AlertDialogDemo() {
  return (
    <AlertDialog
      trigger={<Button variant="danger">
          <Trash2 /> Delete kit
        </Button>}
      title="Delete this kit?"
      description="The kit and its 12 items are removed for good. This can't be undone."
      actionLabel="Delete"
      tone="danger"
      onAction={() => toast.success('Kit deleted')}
    />
  );
}

export function SheetDemo() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {(['right', 'left', 'bottom'] as const).map((side) => (
        <Sheet
          key={side}
          side={side}
          trigger={<Button variant="outline">Open {side}</Button>}
          title="Filters"
          description="Choose what the feature list shows."
          footer={<Sheet.Close render={<Button />}>Apply</Sheet.Close>}
        >
          <div className="flex flex-col gap-3">
            <Input placeholder="Search features…" />
            {['Verified', 'Works badly', 'Crashes', 'New'].map((label) => (
              <label key={label} className="flex items-center justify-between text-sm">
                {label}
                <Switch size="sm" defaultChecked={label === 'Verified'} aria-label={label} />
              </label>
            ))}
          </div>
        </Sheet>
      ))}
    </div>
  );
}

export function DrawerDemo() {
  return (
    <Drawer
      trigger={<Button variant="outline">Open drawer</Button>}
      title="Warrior starter"
      description="Swipe down or press Escape to close."
      footer={<Drawer.Close render={<Button className="w-full sm:w-auto" />}>Spawn kit</Drawer.Close>}
    >
      <ul className="flex flex-col gap-2">
        {['Rusty sword', 'Leather armour', '5 × Healing potion', 'Torch'].map((item) => (
          <li key={item} className="squircle flex items-center justify-between rounded-item bg-surface-2 px-3 py-2">
            {item}
            <Chip size="sm" variant="neutral">
              item
            </Chip>
          </li>
        ))}
      </ul>
    </Drawer>
  );
}

export function DropdownMenuDemo() {
  const [esp, setEsp] = useState(true);
  const [speed, setSpeed] = useState('1x');
  return (
    <div className="flex flex-wrap gap-2.5">
      <DropdownMenu
        trigger={<Button variant="outline">Simple menu</Button>}
        items={[
          { type: 'label', label: 'Kit' },
          { label: 'Rename', icon: <Pencil />, shortcut: 'F2' },
          { label: 'Duplicate', icon: <Copy />, shortcut: 'Ctrl D' },
          { type: 'separator' },
          { label: 'Delete', icon: <Trash2 />, danger: true, onClick: () => toast.error('Kit deleted') },
        ]}
      />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger render={<Button variant="soft" />}>
          <User /> Account
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.GroupLabel>Trainer</DropdownMenu.GroupLabel>
            <DropdownMenu.CheckboxItem checked={esp} onCheckedChange={setEsp}>
              Show ESP
            </DropdownMenu.CheckboxItem>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.GroupLabel>Game speed</DropdownMenu.GroupLabel>
            <DropdownMenu.RadioGroup value={speed} onValueChange={setSpeed}>
              {['0.5x', '1x', '2x'].map((v) => (
                <DropdownMenu.RadioItem key={v} value={v}>
                  {v}
                </DropdownMenu.RadioItem>
              ))}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>
              <Settings /> More
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>Keybindings</DropdownMenu.Item>
              <DropdownMenu.Item>Language</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
          <DropdownMenu.Item danger>
            <LogOut /> Sign out
            <DropdownMenu.Shortcut>Ctrl Q</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}

export function ContextMenuDemo() {
  return (
    <ContextMenu
      className="squircle flex h-40 w-full max-w-md items-center justify-center rounded-card border border-dashed border-border-strong text-sm text-muted"
      items={[
        { label: 'Copy', icon: <Copy />, shortcut: 'Ctrl C' },
        { label: 'Rename', icon: <Pencil />, shortcut: 'F2' },
        { type: 'separator' },
        { label: 'Delete', icon: <Trash2 />, danger: true },
      ]}
    >
      Right-click here
    </ContextMenu>
  );
}

export function HoverCardDemo() {
  return (
    <div className="text-sm">
      Project lead:{' '}
      <HoverCard trigger={<a href="#dawid" className="font-medium text-accent-soft-foreground underline decoration-dotted underline-offset-4">
          @dawid
        </a>}>
        <div className="flex gap-3">
          <span className="squircle flex size-10 shrink-0 items-center justify-center rounded-control-sm bg-accent text-sm font-bold text-accent-foreground">
            D
          </span>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Dawid</span>
            <span className="text-muted">Leads crazy-ui, crazy-hub and the Crazy Gothic Trainer.</span>
            <Chip size="sm" className="mt-1 self-start">
              maintainer
            </Chip>
          </div>
        </div>
      </HoverCard>
    </div>
  );
}

export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-2.5">
      <Toaster />
      <Button variant="outline" onClick={() => toast('Build copied to the game folder')}>
        Default
      </Button>
      <Button variant="outline" onClick={() => toast.success('Kit saved', { description: 'Warrior starter · 12 items' })}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error('Could not reach the game', { description: 'Is Gothic running?' })}>
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((r) => setTimeout(r, 1500)), {
            loading: { title: 'Saving…', type: 'loading' },
            success: { title: 'Saved', type: 'success' },
            error: { title: 'Failed', type: 'error' },
          })
        }
      >
        Promise
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast('Feature disabled', { type: 'info', actionProps: { children: 'Undo', onClick: () => toast.success('Restored') } })
        }
      >
        With action
      </Button>
    </div>
  );
}
