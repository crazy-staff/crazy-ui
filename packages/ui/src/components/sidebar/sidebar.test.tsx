import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from './sidebar';

window.matchMedia ??= ((query: string) => ({
  matches: false,
  media: query,
  addEventListener() {},
  removeEventListener() {},
})) as unknown as typeof window.matchMedia;

function App() {
  return (
    <Sidebar.Provider>
      <Sidebar label="Main">
        <Sidebar.Header>
          <a href="/">Crazy Hub</a>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group label="Feedback">
            <Sidebar.Item href="/ideas" active badge={12}>
              Ideas
            </Sidebar.Item>
            <Sidebar.Item href="/roadmap">Roadmap</Sidebar.Item>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar>
      <Sidebar.Inset>
        <Sidebar.Trigger />
      </Sidebar.Inset>
    </Sidebar.Provider>
  );
}

describe('Sidebar', () => {
  it('renders groups and marks the active row', () => {
    render(<App />);
    expect(screen.getByRole('group', { name: 'Feedback' })).toBeInTheDocument();
    const active = screen.getByRole('link', { name: /Ideas/ });
    expect(active).toHaveAttribute('aria-current', 'page');
    expect(active).toHaveAttribute('data-active', 'true');
    expect(screen.getByRole('link', { name: 'Roadmap' })).not.toHaveAttribute('aria-current');
  });

  it('keeps the header out of the glide', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: 'Crazy Hub' }).closest('[data-no-glide-area]')).not.toBeNull();
    expect(screen.getByRole('link', { name: 'Roadmap' }).closest('[data-no-glide-area]')).toBeNull();
  });

  it('renders one glide block per area', () => {
    const { container } = render(<App />);
    expect(container.querySelectorAll('[data-glide-block]')).toHaveLength(1);
  });

  it('collapses completely with the trigger and the shortcut', async () => {
    const user = userEvent.setup();
    render(<App />);
    const aside = screen.getByRole('complementary', { name: 'Main' });
    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }));
    expect(aside).toHaveAttribute('data-state', 'collapsed');
    expect(aside).toHaveAttribute('inert');
    await user.keyboard('{Control>}b{/Control}');
    expect(aside).toHaveAttribute('data-state', 'open');
  });
});

describe('Sidebar on a phone', () => {
  it('opens from the floating button in the bottom right; the top-bar trigger hides there', async () => {
    window.matchMedia = ((query: string) => ({
      matches: query.includes('max-width'),
      media: query,
      addEventListener() {},
      removeEventListener() {},
    })) as unknown as typeof window.matchMedia;
    render(<App />);
    const fab = screen.getByRole('button', { name: 'Open menu' });
    expect(fab.className).toContain('size-14');
    expect(fab.className).toContain('bottom-5');
    expect(fab.className).toContain('md:hidden');
    expect(screen.getByRole('button', { name: 'Collapse sidebar' }).className).toContain('max-md:hidden');
    await userEvent.click(fab);
    expect(await screen.findByRole('dialog', { name: 'Main' })).toBeInTheDocument();
  });

  it('keeps the trigger in the top bar with mobileTrigger="inline"', () => {
    render(
      <Sidebar.Provider mobileTrigger="inline">
        <Sidebar label="Main">x</Sidebar>
        <Sidebar.Inset>
          <Sidebar.Trigger />
        </Sidebar.Inset>
      </Sidebar.Provider>,
    );
    expect(screen.queryByRole('button', { name: 'Open menu' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Collapse sidebar' }).className).not.toContain('max-md:hidden');
  });
});
