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
  entry('Accordion', 'Stacked sections that expand one at a time.'),
  entry('Alert', 'A callout for important messages.'),
  entry('Alert Dialog', 'A modal that asks to confirm an action.'),
  entry('Aspect Ratio', 'Keeps media at a fixed ratio.'),
  entry('Avatar', 'A user picture with a fallback.'),
  entry('Breadcrumb', 'The path to the current page.'),
  entry('Button', 'The main action control.', 'ready'),
  entry('Button Group', 'Buttons joined into one control.'),
  entry('Calendar', 'A month grid to pick dates.'),
  entry('Card', 'A surface that groups content.', 'ready'),
  entry('Carousel', 'Slides that scroll horizontally.'),
  entry('Chart', 'TanStack Charts in our style.'),
  entry('Checkbox', 'A box to tick on and off.'),
  entry('Chip', 'A small label or status (badge).', 'ready'),
  entry('Code Block', 'Highlighted code with copy.'),
  entry('Collapsible', 'Shows and hides a region.'),
  entry('Combobox', 'An input with a filtered list.'),
  entry('Command', 'A command palette.'),
  entry('Context Menu', 'A menu on right click.'),
  entry('Data Table', 'TanStack Table in our style.'),
  entry('Date Picker', 'A field that opens a calendar.'),
  entry('Dialog', 'A modal window.'),
  entry('Drawer', 'A panel that slides in from an edge.'),
  entry('Dropdown Menu', 'A menu opened by a button.'),
  entry('Empty', 'A placeholder for empty states.'),
  entry('Field', 'Label, control, description and error.'),
  entry('Hover Card', 'A preview card on hover.'),
  entry('Input', 'A single-line text field.', 'ready'),
  entry('Input Group', 'An input with icons or add-ons.'),
  entry('Input OTP', 'One-time code boxes.'),
  entry('Kbd', 'A keyboard key.'),
  entry('Label', 'A label for a form control.'),
  entry('Menubar', 'A row of menus.'),
  entry('Navigation Menu', 'Site navigation with panels.'),
  entry('Pagination', 'Moves between pages of results.'),
  entry('Popover', 'Floating content anchored to a trigger.'),
  entry('Progress', 'A progress bar.'),
  entry('Radio Group', 'Pick one option from a set.'),
  entry('Resizable', 'Panels split by a draggable handle.'),
  entry('Reveal', 'Motion when content scrolls into view.', 'ready'),
  entry('Scroll Area', 'A styled scroll container.'),
  entry('Select', 'Pick one value from a list.'),
  entry('Separator', 'A line between content.'),
  entry('Sheet', 'A side panel over the page.'),
  entry('Sidebar', 'The app sidebar with gliding hover.'),
  entry('Skeleton', 'A placeholder while loading.'),
  entry('Slider', 'Pick a value on a track.'),
  entry('Spinner', 'An indeterminate loading indicator.'),
  entry('Switch', 'An on/off toggle.', 'ready'),
  entry('Table', 'A styled table.'),
  entry('Tabs', 'Switch between views.'),
  entry('Textarea', 'A multi-line text field.'),
  entry('Toast', 'Short messages that pop up.'),
  entry('Toggle', 'A button that stays pressed.'),
  entry('Toggle Group', 'A set of toggles.'),
  entry('Tooltip', 'A hint on hover or focus.'),
  entry('Typography', 'Headings, text and prose.'),
];
