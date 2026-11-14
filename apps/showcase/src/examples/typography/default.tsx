import { Prose } from '@crazy-staff/ui';

export default function TypographyDefault() {
  return (
    <Prose render={<article />}>
      <h2>Installing the trainer</h2>
      <p>
        Copy <code>CrazyTrainer.dll</code> into the <code>System</code> folder of Gothic and start the game. The menu opens
        with <kbd>F8</kbd>. Read the <a href="#changelog">changelog</a> before you update.
      </p>
      <h3>What it does</h3>
      <ul>
        <li>God mode, infinite mana and stamina</li>
        <li>Teleport to any waypoint</li>
        <li>Spawn items and monsters</li>
      </ul>
      <blockquote>Save before you try features marked as “works badly”.</blockquote>
    </Prose>
  );
}
