import { Prose } from '@crazy-staff/ui';

export default function TypographyTable() {
  return (
    <Prose className="w-full">
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><kbd>F8</kbd></td>
            <td>Open the menu</td>
          </tr>
          <tr>
            <td><kbd>F9</kbd></td>
            <td>Toggle god mode</td>
          </tr>
          <tr>
            <td><kbd>F10</kbd></td>
            <td>Teleport to the marker</td>
          </tr>
        </tbody>
      </table>
    </Prose>
  );
}
