import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expectNoA11yViolations, resetViewport, setViewport } from '../../test/utils';
import { ChoiceField } from './choice-field';

const choices = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

describe('ChoiceField', () => {
  afterEach(() => resetViewport());

  it('is a segmented toggle where there is room', async () => {
    const onChange = vi.fn();
    render(<ChoiceField label="Theme" choices={choices} defaultValue="light" onValueChange={onChange} />);
    expect(screen.getByRole('group', { name: 'Theme' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Light' })).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(screen.getByRole('button', { name: 'Dark' }));
    expect(onChange).toHaveBeenCalledWith('dark');
    await expectNoA11yViolations();
  });

  it('on a phone is a full-width button that opens the choices in a drawer', async () => {
    setViewport(390);
    const onChange = vi.fn();
    render(<ChoiceField label="Theme" choices={choices} defaultValue="light" onValueChange={onChange} />);
    const button = await screen.findByRole('button', { name: 'Theme' });
    expect(button).toHaveTextContent('Light');
    expect(button.className).toContain('w-full');
    await userEvent.click(button);
    await screen.findByRole('dialog', { name: 'Theme' });
    expect(screen.getByRole('button', { name: 'Light' })).toHaveAttribute('aria-pressed', 'true');
    await expectNoA11yViolations();
    await userEvent.click(screen.getByRole('button', { name: 'System' }));
    expect(onChange).toHaveBeenCalledWith('system');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(button).toHaveTextContent('System');
    await waitFor(() => expect(button).toHaveFocus());
  });

  it('collapse="always" shows the button on any screen (a menu off the phone)', async () => {
    render(<ChoiceField label="Theme" choices={choices} value="dark" collapse="always" />);
    await userEvent.click(screen.getByRole('button', { name: 'Theme' }));
    expect(await screen.findByRole('menuitemradio', { name: 'Dark' })).toHaveAttribute('aria-checked', 'true');
  });
});
