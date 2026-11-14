import { CodeBlock } from '@crazy-staff/ui';

export default function CodeBlockLanguages() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <CodeBlock code="bun add @crazy-staff/ui" lang="bash" title="Terminal" />
      <CodeBlock code={'{\n  "godMode": true,\n  "mana": "infinite"\n}'} lang="json" title="settings.json" />
    </div>
  );
}
