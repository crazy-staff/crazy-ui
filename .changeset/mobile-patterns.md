---
'@crazy-staff/ui': minor
---

Phone patterns (#7): Dropdown Menu and Popover open as bottom drawers below `sm` (`mobile="none"` to opt
out); picked options are tinted with a check at the end (`checked` items, `title`/`showTitle` on menus);
`TouchProvider`/`useTouch` switch controls to touch size, `Drawer.Content touch`, Button size `icon-lg`;
`usePhone`, `useMediaQuery`, `useDrawerMode`; new `ChoiceField`; Sidebar opens from a floating button on a
phone (`mobileTrigger`) with a drawer as wide as its rows; new `SidePanel`, `SidePanelButton`,
`SidePanelSection`, `useSidePanel`. Radio items now close the menu when picked.
