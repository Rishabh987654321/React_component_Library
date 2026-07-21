import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe } from '../../test-utils/a11y';
import { Select } from './Select';

describe('Select', () => {
  it('has no automated accessibility violations', async () => {
    const { container } = render(
      <Select label="Role">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </Select>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders select with options and handles value change', () => {
    const onChange = vi.fn();
    render(
      <Select label="Role" onChange={onChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </Select>
    );

    const select = screen.getByRole('combobox', { name: 'Role' });
    expect(select).toBeInTheDocument();
    fireEvent.change(select, { target: { value: 'admin' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
