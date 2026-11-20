import * as React from 'react';

/**
 * A phone is a window below Tailwind's `sm` (640px). There, whatever is small and opens (dropdown
 * menus, popovers, pickers) becomes a bottom drawer (guidelines → Mobile).
 */
export const PHONE_QUERY = '(max-width: 639px)';

/**
 * Whether a media query matches. `false` on the server and until measured, so the first client render
 * matches the server's HTML; components switch after mount.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener?.('change', update);
    return () => list.removeEventListener?.('change', update);
  }, [query]);
  return matches;
}

/** True on a phone-sized window (below `sm`). */
export function usePhone() {
  return useMediaQuery(PHONE_QUERY);
}

/** How an adaptive overlay opens: `drawer` on a phone (the default) or always the desktop form. */
export type MobileMode = 'drawer' | 'none';

/** Whether an overlay with this `mobile` mode should render as a drawer right now. */
export function useDrawerMode(mobile: MobileMode = 'drawer') {
  const phone = usePhone();
  return mobile === 'drawer' && phone;
}

const TouchContext = React.createContext(false);

export interface TouchProviderProps {
  /** Switch the subtree to touch size. @default true */
  value?: boolean;
  children?: React.ReactNode;
}

/**
 * Switches the controls of a subtree to touch size, for a finger: buttons, inputs, selects,
 * switches and toggle groups render at `lg`, small icon buttons at full size. The adaptive drawers
 * (Dropdown Menu, Popover, Choice Field on a phone, `SidePanel`'s drawer) turn it on for their content;
 * `<TouchProvider value={false}>` turns it off again for a part of it.
 */
export function TouchProvider({ value = true, children }: TouchProviderProps) {
  return <TouchContext.Provider value={value}>{children}</TouchContext.Provider>;
}

/** True inside a `TouchProvider` (e.g. in an adaptive drawer). */
export function useTouch() {
  return React.useContext(TouchContext);
}
