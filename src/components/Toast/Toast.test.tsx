import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from '../../test-utils/a11y';
import { Toast } from './Toast';

describe('Toast', () => {
  it('has no automated accessibility violations', async () => {
    const { container } = render(<Toast title="Success">Item saved</Toast>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders title and content with role="status"', () => {
    render(<Toast title="Success">Item saved</Toast>);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Item saved')).toBeInTheDocument();
  });
});
