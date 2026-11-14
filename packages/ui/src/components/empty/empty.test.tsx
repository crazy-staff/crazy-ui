import { render, screen } from '@testing-library/react';
import { Empty } from './empty';

describe('Empty', () => {
  it('renders title, text and action', () => {
    render(<Empty title="No posts yet" description="Be the first to suggest a feature." action={<button>New post</button>} />);
    expect(screen.getByRole('heading', { name: 'No posts yet' })).toBeInTheDocument();
    expect(screen.getByText('Be the first to suggest a feature.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'New post' })).toBeInTheDocument();
  });
});
