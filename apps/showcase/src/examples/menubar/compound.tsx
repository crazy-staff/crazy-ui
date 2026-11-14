import { Menubar } from '@crazy-staff/ui';
import { useState } from 'react';

export default function MenubarCompound() {
  const [overlay, setOverlay] = useState(true);
  const [fps, setFps] = useState(false);
  const [language, setLanguage] = useState('en');
  return (
    <Menubar.Root>
      <Menubar.Menu>
        <Menubar.Trigger>View</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.CheckboxItem checked={overlay} onCheckedChange={setOverlay}>
            Show overlay
            <Menubar.Shortcut>Ins</Menubar.Shortcut>
          </Menubar.CheckboxItem>
          <Menubar.CheckboxItem checked={fps} onCheckedChange={setFps}>
            Show FPS
          </Menubar.CheckboxItem>
          <Menubar.Separator />
          <Menubar.Group>
            <Menubar.GroupLabel>Language</Menubar.GroupLabel>
            <Menubar.RadioGroup value={language} onValueChange={setLanguage}>
              <Menubar.RadioItem value="en">English</Menubar.RadioItem>
              <Menubar.RadioItem value="pl">Polski</Menubar.RadioItem>
              <Menubar.RadioItem value="de">Deutsch</Menubar.RadioItem>
            </Menubar.RadioGroup>
          </Menubar.Group>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Teleport</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Sub>
            <Menubar.SubTrigger>Khorinis</Menubar.SubTrigger>
            <Menubar.SubContent>
              <Menubar.Item>Old Camp</Menubar.Item>
              <Menubar.Item>New Camp</Menubar.Item>
              <Menubar.Item>Swamp Camp</Menubar.Item>
            </Menubar.SubContent>
          </Menubar.Sub>
          <Menubar.Item>Last waypoint</Menubar.Item>
          <Menubar.Item>Map marker</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  );
}
