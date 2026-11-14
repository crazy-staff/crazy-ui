import { render, screen } from '@testing-library/react';
import { Item, ItemGroup } from './item';

describe('Item', () => {
  it('renders title, description and actions in the short form', () => {
    render(<Item icon={<svg data-testid="icon" />} title="God mode" description="No damage taken." actions={<button>Toggle</button>} />);
    expect(screen.getByText('God mode')).toBeInTheDocument();
    expect(screen.getByText('No damage taken.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Toggle' })).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders as a link with render', () => {
    render(<Item render={<a href="/posts/1" />} title="Add a teleport menu" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/posts/1');
  });

  it('builds from compound parts inside a group', () => {
    render(
      <ItemGroup framed>
        <Item.Root role="listitem">
          <Item.Content>
            <Item.Title>Infinite mana</Item.Title>
          </Item.Content>
        </Item.Root>
      </ItemGroup>,
    );
    expect(screen.getByRole('list')).toContainElement(screen.getByText('Infinite mana'));
  });
});
