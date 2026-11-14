import { Carousel, useCarousel } from '@crazy-staff/ui';

function Counter() {
  const { selected, count } = useCarousel();
  return (
    <span className="text-sm text-muted tabular-nums">
      {selected + 1} / {count}
    </span>
  );
}

export default function CarouselCompound() {
  return (
    <Carousel.Root aria-label="Screenshots" className="max-w-md">
      <Carousel.Content>
        {['Menu', 'Teleport', 'Spawner'].map((shot) => (
          <Carousel.Item key={shot}>
            <div className="flex aspect-video items-center justify-center font-medium">{shot}</div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <div className="flex items-center gap-2">
        <Counter />
        <Carousel.Previous className="ms-auto" />
        <Carousel.Next />
      </div>
    </Carousel.Root>
  );
}
