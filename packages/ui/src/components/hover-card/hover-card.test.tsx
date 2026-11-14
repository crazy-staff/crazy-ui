import { render, screen } from '@testing-library/react';
import { HoverCard } from './hover-card';

describe('HoverCard', () => {
  it('shows its content when open', async () => {
    render(
      <HoverCard defaultOpen trigger={<a href="#u">@dawid</a>}>
        Project lead
      </HoverCard>,
    );
    expect(screen.getByRole('link', { name: '@dawid' })).toBeInTheDocument();
    expect(await screen.findByText('Project lead')).toBeInTheDocument();
  });
});
