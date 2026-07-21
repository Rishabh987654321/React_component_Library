import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe } from '../../test-utils/a11y';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('has no automated accessibility violations', async () => {
    const { container } = render(<Checkbox label="Accept terms" description="Please agree" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders with label and toggles checked state', () => {
    const onChange = vi.fn();
    render(<Checkbox label="Subscribe to newsletter" onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox', { name: 'Subscribe to newsletter' });
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('respects defaultChecked prop', () => {
    render(<Checkbox label="Opt in" defaultChecked />);
    expect(screen.getByRole('checkbox', { name: 'Opt in' })).toBeChecked();
  });
});
