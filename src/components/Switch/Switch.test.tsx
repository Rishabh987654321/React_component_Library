import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe } from '../../test-utils/a11y';
import { Switch } from './Switch';

describe('Switch', () => {
  it('has no automated accessibility violations', async () => {
    const { container } = render(<Switch label="Enable notifications" defaultChecked />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders switch with role="switch" and aria-checked', () => {
    render(<Switch label="Enable notifications" defaultChecked />);
    const toggle = screen.getByRole('switch', { name: 'Enable notifications' });
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  it('toggles value on click', () => {
    const onChange = vi.fn();
    render(<Switch label="Toggle" onChange={onChange} />);
    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
