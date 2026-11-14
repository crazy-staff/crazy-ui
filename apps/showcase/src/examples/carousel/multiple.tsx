import { Carousel } from '@crazy-staff/ui';

const posts = ['Teleport menu', 'Save editor', 'Free camera', 'Item spawner', 'Weather control', 'Speed hack'];

export default function CarouselMultiple() {
  return (
    <Carousel
      aria-label="Top ideas"
      opts={{ align: 'start' }}
      className="max-w-2xl"
      classNames={{ item: 'basis-1/2 md:basis-1/3' }}
      slides={posts.map((p, i) => (
        <div key={p} className="flex aspect-square flex-col justify-between p-5">
          <span className="text-xs text-muted">#{i + 1}</span>
          <span className="font-medium">{p}</span>
        </div>
      ))}
    />
  );
}
