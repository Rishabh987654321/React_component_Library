import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from '../../test-utils/a11y';
import { Popover } from './Popover';
import { Button } from '../Button';

describe('Popover', () => {
  it('has no automated accessibility violations when open', async () => {
    const { container } = render(
      <Popover content={<p>Popover Content</p>}>
        {({ toggle }) => <Button onClick={toggle}>Toggle Popover</Button>}
      </Popover>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('opens popover panel when trigger is clicked', () => {
    render(
      <Popover content={<p>Popover Content</p>}>
        {({ toggle }) => <Button onClick={toggle}>Toggle Popover</Button>}
      </Popover>
    );

    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Toggle Popover' }));
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });
});
