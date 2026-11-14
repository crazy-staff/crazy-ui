import { fireEvent, render, screen } from '@testing-library/react';
import { ContextMenu } from './context-menu';

describe('ContextMenu', () => {
  it('opens on right click', async () => {
    render(
      <ContextMenu items={[{ label: 'Copy', shortcut: 'Ctrl C' }]}>
        <div>area</div>
      </ContextMenu>,
    );
    fireEvent.contextMenu(screen.getByText('area'));
    expect(await screen.findByRole('menuitem', { name: /Copy/ })).toBeInTheDocument();
  });
});
