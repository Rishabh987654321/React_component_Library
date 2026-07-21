import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe } from '../../test-utils/a11y';
import { Radio, RadioGroup } from './Radio';

describe('Radio & RadioGroup', () => {
  it('has no automated accessibility violations', async () => {
    const { container } = render(
      <RadioGroup legend="Choose Plan" value="opt1">
        <Radio value="opt1" label="Option 1" />
        <Radio value="opt2" label="Option 2" />
      </RadioGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders radio buttons inside fieldset with legend', () => {
    render(
      <RadioGroup legend="Choose Option" value="opt1">
        <Radio value="opt1" label="Option 1" />
        <Radio value="opt2" label="Option 2" />
      </RadioGroup>
    );

    expect(screen.getByText('Choose Option')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Option 1' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Option 2' })).not.toBeChecked();
  });

  it('handles onChange handler in RadioGroup', () => {
    const onChange = vi.fn();
    render(
      <RadioGroup legend="Choose" onChange={onChange}>
        <Radio value="opt1" label="Option 1" />
        <Radio value="opt2" label="Option 2" />
      </RadioGroup>
    );

    fireEvent.click(screen.getByRole('radio', { name: 'Option 2' }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
