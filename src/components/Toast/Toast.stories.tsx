import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  argTypes: {
    onDismiss: { action: 'dismissed' },
  },
  args: {
    title: 'File Uploaded',
    children: 'Your document report.pdf was saved.',
    variant: 'success',
    className: 'max-w-md',
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {};

export const Dismissible: Story = {
  args: {
    title: 'Notification',
    children: 'Hover to pause timer. Click X to dismiss.',
    onDismiss: () => {},
  },
};
