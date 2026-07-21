import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Inputs/Input',
  component: Input,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: {
    helperText: 'We will never share your email.',
  },
};

export const WithError: Story = {
  args: {
    error: 'Please enter a valid email address.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'disabled@example.com',
  },
};
