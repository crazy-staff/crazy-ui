import {
  Boxes,
  Home,
  LayoutGrid,
  type LucideIcon,
  MousePointerClick,
  Palette,
  Ruler,
  Tag,
  TextCursorInput,
  Type,
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const roundNav: NavGroup[] = [
  {
    label: 'Round 1b',
    items: [
      { id: 'overview', label: 'Overview', icon: Home },
      { id: 'buttons', label: 'Buttons', icon: MousePointerClick },
      { id: 'chips', label: 'Chips', icon: Tag },
      { id: 'forms', label: 'Inputs & switches', icon: TextCursorInput },
      { id: 'cards', label: 'Cards', icon: LayoutGrid },
    ],
  },
  {
    label: 'Foundations',
    items: [
      { id: 'colors', label: 'Colours', icon: Palette },
      { id: 'type', label: 'Typography', icon: Type },
      { id: 'radii', label: 'Radii', icon: Ruler },
      { id: 'tokens', label: 'Tokens', icon: Boxes },
    ],
  },
];
