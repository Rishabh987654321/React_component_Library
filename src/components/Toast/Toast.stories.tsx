import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  args: {
    title: 'File Uploaded',
    children: 'Your document report.pdf was saved.',
    variant: 'success',
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {};
