import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from '../../test-utils/a11y';
import { Badge } from './Badge';

describe('Badge', () => {
  it('has no automated accessibility violations', async () => {
    const { container } = render(<Badge variant="success">Active</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders badge text', () => {
    render(<Badge variant="success">Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
});
