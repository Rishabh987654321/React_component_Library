import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  argTypes: {
    onClose: { action: 'closed' },
  },
  args: {
    title: 'System Notification',
    children: 'Your changes have been saved successfully.',
    variant: 'info',
    className: 'max-w-md',
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {};

export const WithCloseButton: Story = {
  args: {
    title: 'Dismissible Alert',
    children: 'Click the X button on the right to dismiss this notification.',
    onClose: () => {},
  },
};

export const AllVariants: Story = {
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-4 max-w-xl">
      <Alert variant="info" title="Info">This is an informational message.</Alert>
      <Alert variant="success" title="Success">Your item was updated.</Alert>
      <Alert variant="warning" title="Warning">Your storage is almost full.</Alert>
      <Alert variant="danger" title="Danger">An error occurred during submission.</Alert>
    </div>
  ),
};
