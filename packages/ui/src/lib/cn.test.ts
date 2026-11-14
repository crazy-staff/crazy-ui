import { cn } from './tv';

describe('cn', () => {
  it('joins conditional classes', () => {
    expect(cn('a', false && 'b', ['c'], { d: true, e: false })).toBe('a c d');
  });

  it('lets later theme classes override earlier ones', () => {
    expect(cn('rounded-control', 'rounded-card')).toBe('rounded-card');
    expect(cn('rounded-control', 'rounded-control-sm')).toBe('rounded-control-sm');
    expect(cn('h-control', 'h-control-lg')).toBe('h-control-lg');
    expect(cn('shadow-card', 'shadow-overlay')).toBe('shadow-overlay');
    expect(cn('bg-accent', 'bg-surface-2')).toBe('bg-surface-2');
  });
});
