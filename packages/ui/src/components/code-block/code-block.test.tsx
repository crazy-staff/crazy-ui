import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodeBlock, highlightCode } from './code-block';

const code = ['const godMode = true;', 'const mana = Infinity;', 'teleport("Old Camp");'].join('\n');

describe('CodeBlock', () => {
  it('shows the code, the title and a copy button', () => {
    render(<CodeBlock code={code} lang="ts" title="trainer.ts" />);
    expect(screen.getByText('trainer.ts')).toBeInTheDocument();
    expect(screen.getByText('const godMode = true;')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copy code' })).toBeInTheDocument();
  });

  it('copies the code', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    render(<CodeBlock code={code} lang="ts" />);
    await user.click(screen.getByRole('button', { name: 'Copy code' }));
    expect(writeText).toHaveBeenCalledWith(code);
    expect(await screen.findByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });

  it('folds long code behind View code', async () => {
    const user = userEvent.setup();
    render(<CodeBlock code={code} lang="ts" collapsedLines={1} />);
    await user.click(screen.getByRole('button', { name: 'View code' }));
    expect(screen.getByRole('button', { name: 'Collapse' })).toBeInTheDocument();
  });

  it('highlights with light-dark() colours and marks lines', async () => {
    const html = await highlightCode(code, { lang: 'ts', highlightLines: [2] });
    expect(html).toContain('light-dark(');
    expect(html.match(/data-highlighted/g)).toHaveLength(1);
    render(<CodeBlock code={code} lang="ts" highlightLines={[2]} />);
    await waitFor(() => expect(document.querySelector('pre span[style*="light-dark"]')).not.toBeNull());
  });
});
