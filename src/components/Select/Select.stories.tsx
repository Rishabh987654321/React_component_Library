import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Inputs/Select',
  component: Select,
  args: {
    label: 'Country',
    defaultValue: 'us',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <option value="us">United States</option>
      <option value="ca">Canada</option>
      <option value="uk">United Kingdom</option>
      <option value="in">India</option>
    </Select>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <Select {...args} error="Please select a valid country.">
      <option value="">Select country...</option>
      <option value="us">United States</option>
      <option value="ca">Canada</option>
    </Select>
  ),
};
