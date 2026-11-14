import { CodeBlock } from '@crazy-staff/ui';

const code = `import { defineTrainer } from '@crazy/trainer';

export default defineTrainer({
  game: 'gothic-1',
  hotkeys: { menu: 'F8', godMode: 'F9' },
  features: ['god-mode', 'infinite-mana', 'teleport'],
});`;

export default function CodeBlockDefault() {
  return <CodeBlock className="max-w-xl" code={code} lang="ts" title="trainer.config.ts" />;
}
