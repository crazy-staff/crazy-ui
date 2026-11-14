import { Button } from '@crazy-staff/ui';
import { Download, MapPin, Wand2 } from 'lucide-react';

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>
        <Wand2 /> Cast meteor
      </Button>
      <Button variant="outline">
        <MapPin /> Teleport
      </Button>
      <Button variant="soft">
        Download build <Download />
      </Button>
    </div>
  );
}
