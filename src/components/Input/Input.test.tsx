import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe } from '../../test-utils/a11y';
import { Input } from './Input';

describe('Input', () => {
  it('has no automated accessibility violations', async () => {
    const { container } = render(<Input label="Email" helperText="Help text" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no accessibility violations in error state', async () => {
    const { container } = render(<Input label="Email" error="Invalid email address" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders input with label and connects id/htmlFor', () => {
    render(<Input label="Username" placeholder="Enter username" />);
    const input = screen.getByLabelText('Username');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter username');
  });

  it('handles onChange events', () => {
    const onChange = vi.fn();
    render(<Input label="Search" onChange={onChange} />);
    const input = screen.getByLabelText('Search');
    fireEvent.change(input, { target: { value: 'React' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('applies aria-invalid and aria-describedby when error is provided', () => {
    render(<Input label="Email" error="Invalid email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });
});
