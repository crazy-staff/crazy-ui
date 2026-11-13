import { render, screen } from '@testing-library/react';
import { Button } from '../button/button';
import { ButtonGroup } from './button-group';

describe('ButtonGroup', () => {
  it('groups buttons', () => {
    render(
      <ButtonGroup aria-label="Zoom">
        <Button variant="outline">-</Button>
        <Button variant="outline">+</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group', { name: 'Zoom' })).toHaveAttribute('data-orientation', 'horizontal');
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
});
