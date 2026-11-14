import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calendar, type DateRange } from './calendar';

const nov = new Date(2026, 10, 1);
const dayButton = (label: RegExp) => screen.getByRole('button', { name: label });

describe('Calendar', () => {
  it('renders the month with Intl names and a 6-week grid', () => {
    render(<Calendar defaultMonth={nov} />);
    expect(screen.getByRole('grid', { name: 'November 2026' })).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')[0]).toHaveTextContent('Mon');
    expect(screen.getAllByRole('row')).toHaveLength(7);
  });

  it('selects a single day', async () => {
    const onValueChange = vi.fn();
    render(<Calendar defaultMonth={nov} onValueChange={onValueChange} />);
    await userEvent.click(dayButton(/^Friday, November 13, 2026$/));
    expect(onValueChange).toHaveBeenCalledWith(new Date(2026, 10, 13));
    expect(dayButton(/November 13, 2026/)).toHaveAttribute('data-selected');
    expect(dayButton(/November 13, 2026/).parentElement).toHaveAttribute('aria-selected', 'true');
  });

  it('selects a range in two clicks, in either order', async () => {
    let range: DateRange | null = null;
    render(<Calendar mode="range" defaultMonth={nov} onValueChange={(r) => (range = r)} />);
    await userEvent.click(dayButton(/November 20, 2026/));
    await userEvent.click(dayButton(/November 10, 2026/));
    expect(range).toEqual({ from: new Date(2026, 10, 10), to: new Date(2026, 10, 20) });
    expect(dayButton(/November 15, 2026/)).toHaveAttribute('data-range-middle');
    expect(dayButton(/November 10, 2026/)).toHaveAttribute('data-range-edge');
  });

  it('blocks disabled, min and max days', async () => {
    const onValueChange = vi.fn();
    render(
      <Calendar
        defaultMonth={nov}
        min={new Date(2026, 10, 5)}
        max={new Date(2026, 10, 25)}
        disabledDates={(d) => d.getDay() === 0}
        onValueChange={onValueChange}
      />,
    );
    await userEvent.click(dayButton(/November 3, 2026/));
    await userEvent.click(dayButton(/Sunday, November 8, 2026/));
    await userEvent.click(dayButton(/November 28, 2026/));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(dayButton(/November 8, 2026/)).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('button', { name: 'Previous month' })).toBeDisabled();
  });

  it('moves focus with the keyboard and changes month', async () => {
    render(<Calendar defaultValue={new Date(2026, 10, 30)} />);
    const start = dayButton(/November 30, 2026/);
    expect(start).toHaveAttribute('tabindex', '0');
    start.focus();
    fireEvent.keyDown(start, { key: 'ArrowRight' });
    expect(await screen.findByRole('grid', { name: 'December 2026' })).toBeInTheDocument();
    expect(document.activeElement).toHaveAccessibleName(/December 1, 2026/);
    fireEvent.keyDown(document.activeElement!, { key: 'PageUp' });
    expect(document.activeElement).toHaveAccessibleName(/November 1, 2026/);
  });

  it('pages with the month buttons', async () => {
    const onMonthChange = vi.fn();
    render(<Calendar defaultMonth={nov} onMonthChange={onMonthChange} locale="pl" />);
    await userEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(onMonthChange).toHaveBeenCalledWith(new Date(2026, 11, 1));
    expect(await screen.findByRole('grid', { name: /grudzień 2026/i })).toBeInTheDocument();
  });

  it('marks today', () => {
    render(<Calendar />);
    expect(document.querySelector('[aria-current="date"]')).toHaveAttribute('data-today');
  });

  it('draws the range as one band per week row', () => {
    const { container } = render(
      <Calendar mode="range" defaultMonth={nov} defaultValue={{ from: new Date(2026, 10, 12), to: new Date(2026, 10, 18) }} />,
    );
    const bands = container.querySelectorAll('[aria-hidden][style*="--band-span"]');
    expect(bands).toHaveLength(2);
    expect((bands[0] as HTMLElement).style.getPropertyValue('--band-from')).toBe('3');
    expect((bands[0] as HTMLElement).style.getPropertyValue('--band-span')).toBe('4');
    expect((bands[1] as HTMLElement).style.getPropertyValue('--band-span')).toBe('3');
  });

  it('keeps today on the selection colours when it is in a range', () => {
    const today = new Date();
    render(<Calendar mode="range" defaultValue={{ from: today, to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3) }} />);
    const el = document.querySelector('[aria-current="date"]')!;
    expect(el).toHaveAttribute('data-range-edge');
    // the today accent text only applies outside a selection, so it never sits on the accent fill
    expect(el.className).toContain('[&[data-today]:not([data-selected],[data-range-edge],[data-range-middle])]:text-accent-soft-foreground');
    expect(el.className).not.toMatch(/(^|\s)data-\[today\]:text-/);
  });
});
