import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from '../../test-utils/a11y';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('has no automated accessibility violations', async () => {
    const { container } = render(<Spinner label="Loading items..." />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders standalone spinner with role="status" and sr-only label', () => {
    render(<Spinner label="Loading items..." />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading items...')).toBeInTheDocument();
  });
});
