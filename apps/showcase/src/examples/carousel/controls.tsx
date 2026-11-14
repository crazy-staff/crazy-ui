import { Carousel } from '@crazy-staff/ui';

export default function CarouselControls() {
  const slides = ['Old Camp', 'New Camp', 'Swamp Camp'].map((camp) => (
    <div key={camp} className="flex aspect-video items-center justify-center font-medium">
      {camp}
    </div>
  ));
  return (
    <div className="grid w-full max-w-3xl gap-8 md:grid-cols-2">
      <Carousel aria-label="Dots only" arrows={false} slides={slides} />
      <Carousel aria-label="Arrows only" dots={false} slides={slides} />
    </div>
  );
}
