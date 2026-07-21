import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from '../../test-utils/a11y';
import { Alert } from './Alert';

describe('Alert', () => {
  it('has no automated accessibility violations', async () => {
    const { container } = render(<Alert variant="danger" title="Error">Critical Error</Alert>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('uses role="alert" for danger variant', () => {
    render(<Alert variant="danger">Critical Error</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses role="status" for info variant', () => {
    render(<Alert variant="info">Info message</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
