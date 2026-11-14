import { CodeBlock } from '@crazy-staff/ui';

const code = `import { Chip, Item, ItemGroup } from '@crazy-staff/ui';
import { Flame, MapPin, Shield } from 'lucide-react';

const features = [
  { icon: <Shield />, name: 'God mode', status: 'verified' },
  { icon: <MapPin />, name: 'Teleport', status: 'new' },
  { icon: <Flame />, name: 'Meteors', status: 'crashes' },
];

export function FeatureList() {
  return (
    <ItemGroup framed>
      {features.map((f) => (
        <Item key={f.name} icon={f.icon} title={f.name} actions={<Chip>{f.status}</Chip>} />
      ))}
    </ItemGroup>
  );
}`;

export default function CodeBlockCollapsible() {
  return <CodeBlock className="max-w-xl" code={code} title="feature-list.tsx" lineNumbers collapsedLines={6} />;
}
