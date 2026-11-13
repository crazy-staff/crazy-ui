import {
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Field,
  Input,
  InputGroup,
  Kbd,
  KbdGroup,
  Label,
  RadioGroup,
  Select,
  Slider,
  Textarea,
  Toggle,
  ToggleGroup,
} from '@crazy-staff/ui';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Eye,
  Grid2x2,
  Italic,
  List,
  Minus,
  Plus,
  Search,
  Underline,
} from 'lucide-react';
import { useState } from 'react';
import { Example } from '@/components/docs/preview';

export function LabelDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="kit-name">Kit name</Label>
      <Input id="kit-name" placeholder="Starter kit" />
    </div>
  );
}

export function FieldDemo() {
  return (
    <form className="flex w-full max-w-sm flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      <Field label="Hero name" description="Shown in the trainer menu.">
        <Field.Control placeholder="Nameless hero" />
      </Field>
      <Field label="Save slot" description="1–20. Errors show after you leave the field." error="Pick a slot between 1 and 20." errorMatch="rangeOverflow">
        <Field.Control type="number" min={1} max={20} defaultValue={3} />
      </Field>
      <Field.Root invalid>
        <Field.Label>Server URL</Field.Label>
        <Field.Control defaultValue="htp://crazy" />
        <Field.Error match>That doesn't look like a URL.</Field.Error>
      </Field.Root>
    </form>
  );
}

export function TextareaDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Label htmlFor="feedback">Feedback</Label>
      <Textarea id="feedback" placeholder="What happened? What did you expect?" />
    </div>
  );
}

export function CheckboxDemo() {
  const [value, setValue] = useState<string[]>(['esp']);
  return (
    <div className="flex w-full flex-wrap gap-10">
      <div className="flex flex-col gap-2.5">
        <Checkbox label="Remember me" defaultChecked />
        <Checkbox label="Send crash reports" />
        <Checkbox label="Beta builds" disabled />
      </div>
      <CheckboxGroup value={value} onValueChange={setValue} aria-label="Overlays">
        <Checkbox name="overlays" value="esp" label="ESP" />
        <Checkbox name="overlays" value="radar" label="Radar" />
        <Checkbox name="overlays" value="compass" label="Compass" />
      </CheckboxGroup>
      <div className="flex flex-col gap-2.5">
        <Checkbox label="Partly selected" indeterminate />
      </div>
    </div>
  );
}

export function RadioGroupDemo() {
  return (
    <RadioGroup
      aria-label="Difficulty"
      defaultValue="normal"
      className="w-full max-w-sm"
      items={[
        { value: 'easy', label: 'Easy', description: 'Enemies deal half damage.' },
        { value: 'normal', label: 'Normal', description: 'The game as designed.' },
        { value: 'hard', label: 'Hard', description: 'No saves during combat.' },
        { value: 'insane', label: 'Insane', description: 'Coming later.', disabled: true },
      ]}
    />
  );
}

const games = [
  { value: 'g1', label: 'Gothic 1' },
  { value: 'g2', label: 'Gothic 2' },
  { value: 'cotm', label: 'Chronicles of Myrtana' },
];

export function SelectDemo() {
  const [value, setValue] = useState<string | null>('g1');
  return (
    <div className="flex w-full flex-wrap items-start gap-6">
      <div className="flex flex-col gap-2">
        <Label>Game</Label>
        <Select aria-label="Game" items={games} value={value} onValueChange={setValue} />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Renderer</Label>
        <Select.Root items={{ dx11: 'GD3D11', dx7: 'DirectX 7' }}>
          <Select.Trigger aria-label="Renderer">
            <Select.Value placeholder="Pick a renderer" />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.GroupLabel>Supported</Select.GroupLabel>
              <Select.Item value="dx11">GD3D11</Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.GroupLabel>Planned</Select.GroupLabel>
              <Select.Item value="dx7" disabled>
                DirectX 7
              </Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>
    </div>
  );
}

export function SliderDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <Slider label="World speed" showValue defaultValue={100} min={25} max={400} step={25} />
      <Slider label="Level range" showValue defaultValue={[5, 30]} min={1} max={50} />
      <Slider aria-label="Volume" defaultValue={40} disabled />
    </div>
  );
}

export function ToggleDemo() {
  return (
    <div className="flex w-full flex-col gap-5">
      <Example label="ghost">
        <Toggle size="icon" aria-label="Bold">
          <Bold />
        </Toggle>
        <Toggle size="icon" aria-label="Italic" defaultPressed>
          <Italic />
        </Toggle>
        <Toggle size="icon" aria-label="Underline">
          <Underline />
        </Toggle>
      </Example>
      <Example label="outline">
        <Toggle variant="outline" defaultPressed>
          <Eye /> Show hidden
        </Toggle>
        <Toggle variant="outline" size="sm">
          Small
        </Toggle>
      </Example>
    </div>
  );
}

export function ToggleGroupDemo() {
  return (
    <div className="flex w-full flex-col gap-5">
      <Example label="single">
        <ToggleGroup
          defaultValue={['list']}
          items={[
            { value: 'list', label: <List />, 'aria-label': 'List' },
            { value: 'grid', label: <Grid2x2 />, 'aria-label': 'Grid' },
          ]}
        />
        <ToggleGroup
          defaultValue={['week']}
          items={[
            { value: 'day', label: 'Day' },
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
          ]}
        />
      </Example>
      <Example label="multiple">
        <ToggleGroup
          multiple
          size="sm"
          defaultValue={['left']}
          items={[
            { value: 'left', label: <AlignLeft />, 'aria-label': 'Left' },
            { value: 'center', label: <AlignCenter />, 'aria-label': 'Centre' },
            { value: 'right', label: <AlignRight />, 'aria-label': 'Right' },
          ]}
        />
      </Example>
    </div>
  );
}

export function KbdDemo() {
  return (
    <div className="flex w-full flex-col gap-5">
      <Example label="keys">
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>Shift</Kbd>
          <Kbd>F8</Kbd>
        </KbdGroup>
        <Kbd size="sm">Esc</Kbd>
      </Example>
      <Example label="in text">
        <p className="text-sm text-muted">
          Open the trainer with <Kbd>F1</Kbd>, search with <Kbd>Ctrl</Kbd> <Kbd>K</Kbd>.
        </p>
      </Example>
    </div>
  );
}

export function InputGroupDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <InputGroup
        start={<Search />}
        end={
          <KbdGroup>
            <Kbd size="sm">Ctrl</Kbd>
            <Kbd size="sm">K</Kbd>
          </KbdGroup>
        }
        placeholder="Search items…"
      />
      <InputGroup start="https://" placeholder="crazy-hub.dev" />
      <InputGroup size="sm" end={<span className="text-xs">gold</span>} placeholder="Amount" type="number" />
    </div>
  );
}

export function ButtonGroupDemo() {
  return (
    <div className="flex w-full flex-col gap-5">
      <Example label="outline">
        <ButtonGroup aria-label="Zoom">
          <Button variant="outline" size="icon" aria-label="Zoom out">
            <Minus />
          </Button>
          <Button variant="outline">100%</Button>
          <Button variant="outline" size="icon" aria-label="Zoom in">
            <Plus />
          </Button>
        </ButtonGroup>
      </Example>
      <Example label="split">
        <ButtonGroup aria-label="Save">
          <Button>Save build</Button>
          <Button size="icon" aria-label="More save options" className="border-s border-accent-foreground/15">
            <ChevronDown />
          </Button>
        </ButtonGroup>
      </Example>
      <Example label="vertical">
        <ButtonGroup orientation="vertical" aria-label="Order">
          <Button variant="outline" size="sm">
            Move up
          </Button>
          <Button variant="outline" size="sm">
            Move down
          </Button>
        </ButtonGroup>
      </Example>
    </div>
  );
}
