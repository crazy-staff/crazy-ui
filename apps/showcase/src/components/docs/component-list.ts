/**
 * Every component crazy-ui will have (the list follows shadcn/ui's catalogue, which the owner
 * picked as the target). `ready` ones have a docs page under /docs/components/<slug>.
 */
export type ComponentStatus = 'ready' | 'planned';

export interface ComponentEntry {
  name: string;
  slug: string;
  status: ComponentStatus;
  description: string;
}

const entry = (name: string, description: string, status: ComponentStatus = 'planned'): ComponentEntry => ({
  name,
  slug: name.toLowerCase().replace(/\s+/g, '-'),
  status,
  description,
});

export const components: ComponentEntry[] = [
  entry('Accordion', 'Stacked sections that expand one at a time.', 'ready'),
  entry('Alert', 'A callout for important messages.', 'ready'),
  entry('Alert Dialog', 'A modal that asks to confirm an action.', 'ready'),
  entry('Aspect Ratio', 'Keeps media at a fixed ratio.', 'ready'),
  entry('Avatar', 'A user picture with a fallback.', 'ready'),
  entry('Breadcrumb', 'The path to the current page.', 'ready'),
  entry('Button', 'The main action control.', 'ready'),
  entry('Button Group', 'Buttons joined into one control.', 'ready'),
  entry('Calendar', 'A month grid to pick dates.', 'ready'),
  entry('Card', 'A surface that groups content.', 'ready'),
  entry('Carousel', 'Slides that scroll horizontally.', 'ready'),
  entry('Chart', 'TanStack Charts in our style.', 'ready'),
  entry('Checkbox', 'A box to tick on and off.', 'ready'),
  entry('Chip', 'A small label or status (badge).', 'ready'),
  entry('Code Block', 'Highlighted code with copy.', 'ready'),
  entry('Collapsible', 'Shows and hides a region.', 'ready'),
  entry('Combobox', 'An input with a filtered list.', 'ready'),
  entry('Command', 'A command palette.', 'ready'),
  entry('Context Menu', 'A menu on right click.', 'ready'),
  entry('Data Table', 'TanStack Table in our style.', 'ready'),
  entry('Date Picker', 'A field that opens a calendar.', 'ready'),
  entry('Dialog', 'A modal window.', 'ready'),
  entry('Drawer', 'A panel that slides in from an edge.', 'ready'),
  entry('Dropdown Menu', 'A menu opened by a button.', 'ready'),
  entry('Empty', 'A placeholder for empty states.', 'ready'),
  entry('Field', 'Label, control, description and error.', 'ready'),
  entry('Hover Card', 'A preview card on hover.', 'ready'),
  entry('Input', 'A single-line text field.', 'ready'),
  entry('Input Group', 'An input with icons or add-ons.', 'ready'),
  entry('Input OTP', 'One-time code boxes.', 'ready'),
  entry('Kbd', 'A keyboard key.', 'ready'),
  entry('Label', 'A label for a form control.', 'ready'),
  entry('Menubar', 'A row of menus.', 'ready'),
  entry('Navigation Menu', 'Site navigation with panels.', 'ready'),
  entry('Pagination', 'Moves between pages of results.', 'ready'),
  entry('Popover', 'Floating content anchored to a trigger.', 'ready'),
  entry('Progress', 'A progress bar.', 'ready'),
  entry('Radio Group', 'Pick one option from a set.', 'ready'),
  entry('Resizable', 'Panels split by a draggable handle.', 'ready'),
  entry('Scroll Area', 'A styled scroll container.', 'ready'),
  entry('Select', 'Pick one value from a list.', 'ready'),
  entry('Separator', 'A line between content.', 'ready'),
  entry('Sheet', 'A side panel over the page.', 'ready'),
  entry('Sidebar', 'The app sidebar with gliding hover.', 'ready'),
  entry('Skeleton', 'A placeholder while loading.', 'ready'),
  entry('Slider', 'Pick a value on a track.', 'ready'),
  entry('Spinner', 'An indeterminate loading indicator.', 'ready'),
  entry('Switch', 'An on/off toggle.', 'ready'),
  entry('Table', 'A styled table.', 'ready'),
  entry('Tabs', 'Switch between views.', 'ready'),
  entry('Textarea', 'A multi-line text field.', 'ready'),
  entry('Toast', 'Short messages that pop up.', 'ready'),
  entry('Toggle', 'A button that stays pressed.', 'ready'),
  entry('Toggle Group', 'A set of toggles.', 'ready'),
  entry('Tooltip', 'A hint on hover or focus.', 'ready'),
  entry('Typography', 'Headings, text and prose.', 'ready'),
];
