import { Collapsible, Switch } from '@crazy-staff/ui';

export default function CollapsibleDefault() {
  return (
    <Collapsible title="Advanced options" className="w-full max-w-sm">
      <div className="flex flex-col gap-3 px-2.5 pt-3 pb-1 text-sm">
        <label className="flex items-center justify-between gap-4">
          Show hotkeys in the menu <Switch defaultChecked />
        </label>
        <label className="flex items-center justify-between gap-4">
          Log cheats to a file <Switch />
        </label>
      </div>
    </Collapsible>
  );
}
