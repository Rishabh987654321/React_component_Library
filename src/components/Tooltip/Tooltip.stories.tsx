import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  args: {
    content: 'Add to favorites',
    position: 'top',
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <div className="p-10 flex justify-center">
      <Tooltip {...args}>
        <Button variant="secondary">Hover or Focus Me</Button>
      </Tooltip>
    </div>
  ),
};
