import { X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { useMediaQuery, useTouch } from '../../lib/responsive';
import { cn } from '../../lib/tv';
import { Button } from '../button/button';
import { Drawer } from '../drawer/drawer';
import { revealEase } from '../reveal/reveal';
import { Tooltip } from '../tooltip/tooltip';
import { sidePanelStyles } from './side-panel.styles';

/** Where a page has its right column (the panel's place on a wide screen). */
export const WIDE_QUERY = '(min-width: 1024px)';

export interface SidePanelState {
  id: string;
  /** The right column is there (else the panel opens in a drawer). */
  wide: boolean;
  /** Shown in the right column (wide screens). */
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface UseSidePanelOptions {
  /** Force the layout instead of `query` (e.g. from a container measurement). */
  wide?: boolean;
  /** The media query of the wide layout. @default '(min-width: 1024px)' */
  query?: string;
  /** Shown in the column until the person hides it. @default true */
  defaultOpen?: boolean;
}

/**
 * The state of one page's side panel: open or hidden in the right column, remembered per `id` in this
 * browser (storage may be unavailable; then only for this page view).
 */
export function useSidePanel(id: string, { wide: wideProp, query = WIDE_QUERY, defaultOpen = true }: UseSidePanelOptions = {}): SidePanelState {
  const key = `crazy-ui:side-panel:${id}`;
  const matches = useMediaQuery(query);
  const wide = wideProp ?? matches;
  const [open, setOpenState] = React.useState(defaultOpen);
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) setOpenState(stored === 'open');
    } catch {
      // no storage
    }
  }, [key]);
  const setOpen = React.useCallback(
    (next: boolean) => {
      setOpenState(next);
      try {
        localStorage.setItem(key, next ? 'open' : 'hidden');
      } catch {
        // no storage
      }
    },
    [key],
  );
  return { id, wide, open, setOpen };
}

const styles = sidePanelStyles();

export interface SidePanelProps {
  panel: SidePanelState;
  title: string;
  /** Label of the hide button. @default 'Hide panel' */
  hideLabel?: string;
  children: React.ReactNode;
  className?: string;
}

/** The panel in the page's right column; renders nothing on a narrow screen or while hidden. */
export function SidePanel({ panel, title, hideLabel = 'Hide panel', children, className }: SidePanelProps) {
  const reduce = useReducedMotion();
  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, x: 24, filter: 'blur(4px)' },
        animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, x: 24, filter: 'blur(4px)' },
        transition: { duration: 0.28, ease: revealEase },
      };
  return (
    <AnimatePresence initial={false}>
      {panel.wide && panel.open && (
        <motion.section key="panel" aria-label={title} className={cn(styles.panel(), className)} {...motionProps}>
          <header className={styles.header()}>
            <h2 className={styles.title()}>{title}</h2>
            <Button variant="ghost" size="icon-sm" aria-label={hideLabel} onClick={() => panel.setOpen(false)}>
              <X />
            </Button>
          </header>
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export interface SidePanelButtonProps {
  panel: SidePanelState;
  title: string;
  icon: React.ReactNode;
  variant?: 'ghost' | 'outline';
  /** The panel's content, for the drawer of a narrow screen. */
  children: React.ReactNode;
  className?: string;
}

/**
 * The icon button among the page's controls that opens the panel: on a wide screen it shows or hides
 * the right column (pressed while open); on a narrow one it opens the same content in a drawer with
 * touch-size controls.
 */
export function SidePanelButton({ panel, title, icon, variant = 'ghost', children, className }: SidePanelButtonProps) {
  const [drawer, setDrawer] = React.useState(false);
  const pressed = panel.wide && panel.open;
  return (
    <>
      <Tooltip content={title}>
        <Button
          variant={variant}
          size="icon"
          aria-label={title}
          aria-pressed={panel.wide ? pressed : undefined}
          aria-expanded={panel.wide ? undefined : drawer}
          className={cn(pressed && styles.pressed(), className)}
          onClick={() => (panel.wide ? panel.setOpen(!panel.open) : setDrawer(true))}
        >
          {icon}
        </Button>
      </Tooltip>
      {!panel.wide && (
        <Drawer.Root open={drawer} onOpenChange={setDrawer}>
          <Drawer.Content touch>
            <Drawer.Title>{title}</Drawer.Title>
            <Drawer.Body>
              <section aria-label={title} className={styles.drawerBody()}>
                {children}
              </section>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      )}
    </>
  );
}

export interface SidePanelSectionProps {
  /** One word: the section's name. */
  label: string;
  icon?: React.ReactNode;
  /** Icon actions on the right of the label. */
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/** One block of a side panel: icon + a one-word name, optional icon actions, then the content. */
export function SidePanelSection({ label, icon, actions, children, className }: SidePanelSectionProps) {
  const touch = useTouch();
  const s = sidePanelStyles({ touch });
  return (
    <div role="group" aria-label={label} className={cn(s.section(), className)}>
      <div className={s.sectionHead()}>
        <span className={s.sectionLabel()}>
          {icon}
          {label}
        </span>
        {actions && <span className={s.sectionActions()}>{actions}</span>}
      </div>
      {children}
    </div>
  );
}
