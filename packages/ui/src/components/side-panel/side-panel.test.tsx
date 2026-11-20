import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Shield } from 'lucide-react';
import { resetViewport, setViewport, expectNoA11yViolations } from '../../test/utils';
import { Switch } from '../switch/switch';
import { SidePanel, SidePanelButton, SidePanelSection, useSidePanel } from './side-panel';

function Page() {
  const panel = useSidePanel('test');
  const content = (
    <SidePanelSection label="Status">
      <Switch aria-label="Locked" />
    </SidePanelSection>
  );
  return (
    <>
      <SidePanelButton panel={panel} title="Moderation" icon={<Shield />}>
        {content}
      </SidePanelButton>
      <SidePanel panel={panel} title="Moderation">
        {content}
      </SidePanel>
    </>
  );
}

describe('SidePanel', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => resetViewport());

  it('on a wide screen the button shows and hides the column, pressed while open, remembered', async () => {
    setViewport(1440);
    const { unmount } = render(<Page />);
    const button = await screen.findByRole('button', { name: 'Moderation' });
    await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'true'));
    expect(screen.getByRole('region', { name: 'Moderation' })).toBeInTheDocument();
    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'false');
    await waitFor(() => expect(screen.queryByRole('region', { name: 'Moderation' })).not.toBeInTheDocument());
    expect(localStorage.getItem('crazy-ui:side-panel:test')).toBe('hidden');
    unmount();
    render(<Page />);
    await waitFor(() => expect(screen.getByRole('button', { name: 'Moderation' })).toHaveAttribute('aria-pressed', 'false'));
  });

  it('on a narrow screen it opens a drawer with touch-size controls', async () => {
    setViewport(390);
    render(<Page />);
    await userEvent.click(await screen.findByRole('button', { name: 'Moderation' }));
    await screen.findByRole('dialog', { name: 'Moderation' });
    expect(screen.getByRole('switch', { name: 'Locked' }).className).toContain('h-6');
    expect(screen.getByRole('group', { name: 'Status' }).className).toContain('pt-5');
    await expectNoA11yViolations();
  });
});
