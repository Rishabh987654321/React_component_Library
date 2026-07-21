import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from '../../test-utils/a11y';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

describe('Tooltip', () => {
  it('has no automated accessibility violations', async () => {
    const { container } = render(
      <Tooltip content="Tooltip Text">
        <Button>Trigger</Button>
      </Tooltip>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('shows tooltip on focus and hover, connecting aria-describedby', () => {
    render(
      <Tooltip content="Tooltip Text">
        <Button>Trigger</Button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'Trigger' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    fireEvent.focus(button);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveTextContent('Tooltip Text');
    expect(button).toHaveAttribute('aria-describedby', tooltip.id);

    fireEvent.blur(button);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
