import { render, screen } from '@testing-library/react';
import { Kbd, KbdGroup } from './kbd';

describe('Kbd', () => {
  it('renders kbd elements', () => {
    render(
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>,
    );
    expect(screen.getByText('Ctrl').tagName).toBe('KBD');
    expect(screen.getByText('K')).toHaveClass('font-mono');
  });
});
