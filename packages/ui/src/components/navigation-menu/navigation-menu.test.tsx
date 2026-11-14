import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavigationMenu } from './navigation-menu';

const items = [
  {
    label: 'Trainer',
    links: [
      { title: 'Install', href: '/docs/install', description: 'Copy the DLL into the game folder.' },
      { title: 'Features', href: '/docs/features' },
    ],
  },
  { label: 'Roadmap', content: <p>Gothic 2 support is next.</p> },
  { label: 'Changelog', href: '/changelog', active: true },
];

describe('NavigationMenu', () => {
  it('renders a nav with triggers and links', () => {
    render(<NavigationMenu items={items} aria-label="Main" />);
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Trainer' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Changelog' })).toHaveAttribute('aria-current', 'page');
  });

  it('opens a panel with link cards on click', async () => {
    render(<NavigationMenu items={items} />);
    const trigger = screen.getByRole('button', { name: 'Trainer' });
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(await screen.findByRole('link', { name: /Install/ })).toHaveAttribute('href', '/docs/install');
    expect(screen.getByText('Copy the DLL into the game folder.')).toBeInTheDocument();
  });

  it('shows custom panel content', async () => {
    render(<NavigationMenu items={items} />);
    await userEvent.click(screen.getByRole('button', { name: 'Roadmap' }));
    expect(await screen.findByText('Gothic 2 support is next.')).toBeInTheDocument();
  });
});
