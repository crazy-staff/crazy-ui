import { render, screen } from '@testing-library/react';
import { ScrollArea } from './scroll-area';

describe('ScrollArea', () => {
  it('renders its content in a scrollable viewport', () => {
    render(
      <ScrollArea className="h-20">
        <p>Row 1</p>
        <p>Row 2</p>
      </ScrollArea>,
    );
    expect(screen.getByText('Row 1')).toBeInTheDocument();
    expect(screen.getByText('Row 2')).toBeInTheDocument();
  });
});
