import { render, screen } from '@testing-library/react';
import { Resizable } from './resizable';

class RO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= RO as unknown as typeof ResizeObserver;

describe('Resizable', () => {
  it('renders panels with a focusable separator between them', () => {
    render(
      <Resizable.Group orientation="horizontal" style={{ width: 600, height: 200 }}>
        <Resizable.Panel defaultSize="40">Feature list</Resizable.Panel>
        <Resizable.Handle withHandle />
        <Resizable.Panel>Details</Resizable.Panel>
      </Resizable.Group>,
    );
    expect(screen.getByText('Feature list')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('tabindex', '0');
  });
});
