import { render, screen } from '@testing-library/react';
import { Prose, Typography } from './typography';

describe('Typography', () => {
  it('renders parts with their elements', () => {
    render(
      <>
        <Typography.H2>Roadmap</Typography.H2>
        <Typography.Link href="/changelog">Changelog</Typography.Link>
        <Typography.InlineCode>F8</Typography.InlineCode>
      </>,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Roadmap' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Changelog' })).toHaveAttribute('href', '/changelog');
    expect(screen.getByText('F8').tagName).toBe('CODE');
  });

  it('keeps the look but swaps the element with render', () => {
    render(<Typography.H2 render={<h3 />}>Small heading</Typography.H2>);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Small heading');
  });

  it('wraps long-form content', () => {
    render(
      <Prose render={<article />} data-testid="prose">
        <h2>Install</h2>
        <p>Copy the DLL.</p>
      </Prose>,
    );
    expect(screen.getByTestId('prose').tagName).toBe('ARTICLE');
    expect(screen.getByRole('heading', { name: 'Install' })).toBeInTheDocument();
  });
});
