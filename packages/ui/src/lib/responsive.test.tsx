import { render, screen } from '@testing-library/react';
import { Button } from '../components/button/button';
import { Input } from '../components/input/input';
import { Switch } from '../components/switch/switch';
import { ToggleGroup } from '../components/toggle-group/toggle-group';
import { resetViewport, setViewport } from '../test/utils';
import { TouchProvider, usePhone } from './responsive';

describe('TouchProvider', () => {
  it('switches controls of the subtree to touch size', () => {
    render(
      <TouchProvider>
        <Button>Save</Button>
        <Button size="icon-sm" aria-label="Edit" />
        <Input aria-label="Name" size="sm" />
        <Switch aria-label="On" />
        <ToggleGroup aria-label="Sort" items={[{ value: 'a', label: 'A' }]} />
        <TouchProvider value={false}>
          <Button>Small</Button>
        </TouchProvider>
      </TouchProvider>,
    );
    expect(screen.getByRole('button', { name: 'Save' }).className).toContain('h-control-lg');
    expect(screen.getByRole('button', { name: 'Edit' }).className).toContain('w-control-lg');
    expect(screen.getByRole('textbox', { name: 'Name' }).className).toContain('h-control-lg');
    expect(screen.getByRole('switch', { name: 'On' }).className).toContain('h-6');
    expect(screen.getByRole('button', { name: 'A' }).className).toContain('h-control-lg');
    expect(screen.getByRole('button', { name: 'Small' }).className).not.toContain('h-control-lg');
  });

  it('leaves sizes alone outside it', () => {
    render(<Button size="sm">Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' }).className).toContain('h-control-sm');
  });
});

describe('usePhone', () => {
  afterEach(() => resetViewport());
  function Probe() {
    return <span>{usePhone() ? 'phone' : 'wide'}</span>;
  }
  it('is true below sm only', async () => {
    setViewport(639);
    const { unmount } = render(<Probe />);
    expect(await screen.findByText('phone')).toBeInTheDocument();
    unmount();
    setViewport(640);
    render(<Probe />);
    expect(await screen.findByText('wide')).toBeInTheDocument();
  });
});
