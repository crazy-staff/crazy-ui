import { Carousel } from '@crazy-staff/ui';

const features = [
  { name: 'God mode', text: 'The hero takes no damage.' },
  { name: 'Teleport', text: 'Jump to any waypoint in the valley.' },
  { name: 'Meteors', text: 'Rain fire on the Old Camp.' },
  { name: 'Infinite mana', text: 'Cast without ever running dry.' },
];

export default function CarouselDefault() {
  return (
    <Carousel
      aria-label="Trainer features"
      className="max-w-md"
      slides={features.map((f) => (
        <div key={f.name} className="flex aspect-[4/3] flex-col justify-end gap-1 p-6">
          <span className="text-lg font-semibold">{f.name}</span>
          <span className="text-sm text-muted">{f.text}</span>
        </div>
      ))}
    />
  );
}
