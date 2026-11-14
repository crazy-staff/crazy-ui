import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { Button, type ButtonProps } from '../button/button';
import { carouselStyles } from './carousel.styles';

type CarouselApi = NonNullable<UseEmblaCarouselType[1]>;
type CarouselOptions = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;
type CarouselPlugins = Parameters<typeof useEmblaCarousel>[1];
type Orientation = 'horizontal' | 'vertical';

interface CarouselContextValue {
  viewportRef: UseEmblaCarouselType[0];
  api: CarouselApi | undefined;
  orientation: Orientation;
  selected: number;
  count: number;
  canPrev: boolean;
  canNext: boolean;
  prev: () => void;
  next: () => void;
  goTo: (index: number) => void;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

/** The carousel state inside `Carousel.Root`: `{ api, selected, count, prev, next, goTo, … }`. */
export function useCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error('useCarousel must be used inside <Carousel.Root>');
  return ctx;
}

export interface CarouselRootProps extends React.ComponentPropsWithRef<'div'> {
  /** Embla options (`align`, `slidesToScroll`, `dragFree` …). `loop` and `orientation` have their own props. */
  opts?: Omit<CarouselOptions, 'loop' | 'axis'>;
  plugins?: CarouselPlugins;
  /** Wrap from the last slide to the first. */
  loop?: boolean;
  /** @default 'horizontal' */
  orientation?: Orientation;
  /** Receives the Embla API once it is ready. */
  setApi?: (api: CarouselApi) => void;
  /** Called when the current slide changes. */
  onSelectedChange?: (index: number) => void;
}

/** Holds the state; arrow keys on any focused part move between slides. */
function CarouselRoot({
  opts,
  plugins,
  loop = false,
  orientation = 'horizontal',
  setApi,
  onSelectedChange,
  className,
  onKeyDownCapture,
  children,
  ...props
}: CarouselRootProps) {
  const [viewportRef, api] = useEmblaCarousel({ ...opts, loop, axis: orientation === 'horizontal' ? 'x' : 'y' }, plugins);
  const reduced = useReducedMotion() ?? false;
  const [state, setState] = React.useState({ selected: 0, count: 0, canPrev: false, canNext: false });
  const onChange = React.useRef(onSelectedChange);
  onChange.current = onSelectedChange;

  React.useEffect(() => {
    if (!api) return;
    setApi?.(api);
    const update = () => {
      const selected = api.selectedScrollSnap();
      setState((prev) => {
        if (prev.selected !== selected) onChange.current?.(selected);
        return { selected, count: api.scrollSnapList().length, canPrev: api.canScrollPrev(), canNext: api.canScrollNext() };
      });
    };
    update();
    api.on('select', update).on('reInit', update);
    return () => {
      api.off('select', update).off('reInit', update);
    };
  }, [api, setApi]);

  const prev = React.useCallback(() => api?.scrollPrev(reduced), [api, reduced]);
  const next = React.useCallback(() => api?.scrollNext(reduced), [api, reduced]);
  const goTo = React.useCallback((i: number) => api?.scrollTo(i, reduced), [api, reduced]);

  const handleKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDownCapture?.(event);
    const back = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    const forward = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    if (event.key === back) {
      event.preventDefault();
      prev();
    } else if (event.key === forward) {
      event.preventDefault();
      next();
    }
  };

  return (
    <CarouselContext.Provider value={{ viewportRef, api, orientation, ...state, prev, next, goTo }}>
      <div
        role="region"
        aria-roledescription="carousel"
        data-orientation={orientation}
        onKeyDownCapture={handleKey}
        className={cn(carouselStyles().root(), className)}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export interface CarouselContentProps extends React.ComponentPropsWithRef<'div'> {
  classNames?: { viewport?: string };
}

/** The clipped viewport and the moving track. Put `Carousel.Item`s inside. */
function CarouselContent({ className, classNames, ...props }: CarouselContentProps) {
  const { viewportRef, orientation } = useCarousel();
  const s = carouselStyles({ orientation });
  return (
    <div ref={viewportRef} className={cn(s.viewport(), orientation === 'vertical' && 'h-full', classNames?.viewport)}>
      <div className={cn(s.container(), className)} {...props} />
    </div>
  );
}

export interface CarouselItemProps extends React.ComponentPropsWithRef<'div'> {
  /** Wrap the content in a squircle card. @default true */
  card?: boolean;
  classNames?: { card?: string };
}

/**
 * One slide. Its width is `basis-full`; pass e.g. `className="md:basis-1/2"` to show several at once.
 * The slide's label ("2 of 5") is added for screen readers.
 */
function CarouselItem({ card = true, className, classNames, children, ...props }: CarouselItemProps) {
  const { orientation, count } = useCarousel();
  const s = carouselStyles({ orientation });
  const ref = React.useRef<HTMLDivElement>(null);
  const [label, setLabel] = React.useState<string>();
  React.useEffect(() => {
    const el = ref.current;
    if (!el?.parentElement) return;
    const index = Array.prototype.indexOf.call(el.parentElement.children, el) as number;
    setLabel(`${index + 1} of ${el.parentElement.children.length}`);
  }, [count]);
  return (
    <div ref={ref} role="group" aria-roledescription="slide" aria-label={label} className={cn(s.item(), className)} {...props}>
      {card ? <div className={cn(s.card(), classNames?.card)}>{children}</div> : children}
    </div>
  );
}

function CarouselPrevious({ className, children, ...props }: ButtonProps) {
  const { prev, canPrev, orientation } = useCarousel();
  return (
    <Button variant="outline" size="icon-sm" aria-label="Previous slide" disabled={!canPrev} onClick={prev} className={className} {...props}>
      {children ?? (orientation === 'horizontal' ? <ChevronLeft /> : <ChevronUp />)}
    </Button>
  );
}

function CarouselNext({ className, children, ...props }: ButtonProps) {
  const { next, canNext, orientation } = useCarousel();
  return (
    <Button variant="outline" size="icon-sm" aria-label="Next slide" disabled={!canNext} onClick={next} className={className} {...props}>
      {children ?? (orientation === 'horizontal' ? <ChevronRight /> : <ChevronDown />)}
    </Button>
  );
}

export interface CarouselDotsProps extends React.ComponentPropsWithRef<'div'> {
  classNames?: { dot?: string; current?: string };
}

/** One dot per snap point; the current one is an accent pill that glides. */
function CarouselDots({ className, classNames, ...props }: CarouselDotsProps) {
  const { count, selected, goTo } = useCarousel();
  const id = React.useId();
  const reduced = useReducedMotion();
  const s = carouselStyles();
  return (
    <div role="group" aria-label="Choose slide" className={cn(s.dots(), className)} {...props}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === selected ? 'true' : undefined}
          onClick={() => goTo(i)}
          className={cn(s.dot(), classNames?.dot)}
        >
          {i === selected && (
            <motion.span
              layoutId={`carousel-dot-${id}`}
              transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 520, damping: 40 }}
              className={cn(s.dotCurrent(), classNames?.current)}
            />
          )}
        </button>
      ))}
    </div>
  );
}

/** The default control row: previous, dots, next. */
function CarouselControls({ className, ...props }: React.ComponentPropsWithRef<'div'>) {
  return (
    <div className={cn(carouselStyles().controls(), className)} {...props}>
      <CarouselPrevious />
      <CarouselDots />
      <CarouselNext />
    </div>
  );
}

export interface CarouselProps extends Omit<CarouselRootProps, 'children'> {
  /** One node per slide. */
  slides: React.ReactNode[];
  /** Show the previous/next buttons. @default true */
  arrows?: boolean;
  /** Show the dots. @default true */
  dots?: boolean;
  /** Wrap each slide in a card. @default true */
  card?: boolean;
  classNames?: { viewport?: string; content?: string; item?: string; card?: string; controls?: string };
}

/**
 * Slides that scroll horizontally, with arrows, dots, swipe and keyboard.
 *   <Carousel loop slides={[<Slide1 />, <Slide2 />]} />
 * or compound: Carousel.Root / Content / Item / Previous / Next / Dots / Controls, plus `useCarousel()`.
 */
function CarouselSimple({ slides, arrows = true, dots = true, card, classNames, ...props }: CarouselProps) {
  return (
    <CarouselRoot {...props}>
      <CarouselContent className={classNames?.content} classNames={{ viewport: classNames?.viewport }}>
        {slides.map((slide, i) => (
          <CarouselItem key={i} card={card} className={classNames?.item} classNames={{ card: classNames?.card }}>
            {slide}
          </CarouselItem>
        ))}
      </CarouselContent>
      {(arrows || dots) && (
        <div className={cn(carouselStyles().controls(), !arrows && 'justify-center', classNames?.controls)}>
          {arrows && <CarouselPrevious />}
          {dots && <CarouselDots />}
          {arrows && <CarouselNext />}
        </div>
      )}
    </CarouselRoot>
  );
}

export const Carousel = Object.assign(CarouselSimple, {
  Root: CarouselRoot,
  Content: CarouselContent,
  Item: CarouselItem,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  Dots: CarouselDots,
  Controls: CarouselControls,
});

export type { CarouselApi, CarouselOptions };
