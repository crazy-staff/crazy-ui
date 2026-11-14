import { Carousel } from '@crazy-staff/ui';

const builds = ['0.7', '0.8', '0.9', '0.10'];

export default function CarouselLoop() {
  return (
    <Carousel
      loop
      aria-label="Builds"
      className="max-w-sm"
      slides={builds.map((b) => (
        <div key={b} className="flex aspect-square items-center justify-center text-4xl font-semibold">
          {b}
        </div>
      ))}
    />
  );
}
