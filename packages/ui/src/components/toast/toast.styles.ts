import { tv } from '../../lib/tv';

/**
 * Stacked toasts, adapted from Base UI's toast example: the front toast is full size, the ones
 * behind peek out and shrink; hovering expands the stack. Toasts don't use `squircle`: the stack
 * needs the `::after` hover bridge, which the squircle polyfill would take over in Firefox.
 */
export const toastStyles = tv({
  slots: {
    viewport: 'fixed right-4 bottom-4 left-4 z-[100] mx-auto flex sm:right-6 sm:bottom-6 sm:left-auto sm:w-[22rem]',
    root: [
      'absolute right-0 bottom-0 left-auto w-full origin-bottom select-none',
      'rounded-card border border-border bg-popover bg-clip-padding p-4 pe-11 text-sm text-foreground shadow-overlay',
      '[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]',
      '[--height:var(--toast-frontmost-height,var(--toast-height))]',
      '[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]',
      'z-[calc(1000-var(--toast-index))] h-(--height) data-[expanded]:h-(--toast-height)',
      '[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]',
      'data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]',
      'data-[limited]:opacity-0 data-[starting-style]:[transform:translateY(150%)]',
      'data-[ending-style]:opacity-0',
      'data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]',
      'data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
      '[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]',
      "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
      'transition-[transform,opacity,height] duration-500 ease-ui',
    ],
    content: [
      'flex items-start gap-3 overflow-hidden transition-opacity duration-250',
      'data-[behind]:pointer-events-none data-[behind]:opacity-0 data-[expanded]:pointer-events-auto data-[expanded]:opacity-100',
    ],
    icon: 'mt-0.5 size-4 shrink-0',
    text: 'flex min-w-0 flex-1 flex-col gap-0.5',
    title: 'font-medium text-foreground',
    description: 'text-muted',
    action: 'mt-2.5 self-start',
    close: 'absolute top-2.5 right-2.5',
  },
});
