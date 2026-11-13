import { render } from '@testing-library/react';
import { AspectRatio } from './aspect-ratio';

describe('AspectRatio', () => {
  it('sets the aspect ratio', () => {
    const { container } = render(<AspectRatio ratio={16 / 9} />);
    expect((container.firstElementChild as HTMLElement).style.aspectRatio).toMatch(/^1\.777/);
  });
});
