import { render, screen } from '@testing-library/react';
import { Drawer } from './drawer';

describe('Drawer', () => {
  it('shows title and content when open', async () => {
    render(
      <Drawer defaultOpen title="Kit details" description="Everything in the kit">
        items
      </Drawer>,
    );
    expect(await screen.findByText('Kit details')).toBeInTheDocument();
    expect(screen.getByText('Everything in the kit')).toBeInTheDocument();
    expect(screen.getByText('items')).toBeInTheDocument();
  });
});
