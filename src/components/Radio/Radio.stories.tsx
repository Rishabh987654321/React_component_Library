import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Inputs/Radio',
  component: RadioGroup,
  args: {
    legend: 'Select a plan',
    value: 'starter',
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="starter" label="Starter" description="$10/mo for basic features." />
      <Radio value="pro" label="Pro" description="$30/mo for team features." />
      <Radio value="enterprise" label="Enterprise" description="Custom pricing for scale." />
    </RadioGroup>
  ),
};
