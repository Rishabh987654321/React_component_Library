import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>Deploy your new React library in one click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-body-md text-text dark:text-text-dark">
          Your project will be configured with Vite, Tailwind CSS, Storybook, and automated CI pipelines.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Deploy</Button>
      </CardFooter>
    </Card>
  ),
};
