import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../Button';
import { Input } from '../Input';

const meta: Meta<typeof Popover> = {
  title: 'Overlays/Popover',
  component: Popover,
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="p-10 flex justify-center">
      <Popover
        content={
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-headline-sm">Filter Settings</h4>
            <Input label="Search Keyword" placeholder="Filter..." />
            <Button size="sm">Apply Filters</Button>
          </div>
        }
      >
        {({ toggle }) => <Button onClick={toggle}>Open Popover</Button>}
      </Popover>
    </div>
  ),
};
