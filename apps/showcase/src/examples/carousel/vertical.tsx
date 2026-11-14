import { Carousel } from '@crazy-staff/ui';

export default function CarouselVertical() {
  return (
    <Carousel.Root orientation="vertical" aria-label="Changelog" className="max-w-xs">
      <Carousel.Content className="h-48">
        {['0.9 — meteors leave craters', '0.8 — teleport menu', '0.7 — god mode'].map((entry) => (
          <Carousel.Item key={entry} className="basis-full">
            <div className="flex h-full items-center p-5 text-sm">{entry}</div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Controls />
    </Carousel.Root>
  );
}
