import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Data Display/Tabs',
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="max-w-md">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-body-md">Manage your account profile and preference options here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-body-md">Change your password and manage security keys.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-body-md">System and notification settings.</p>
      </TabsContent>
    </Tabs>
  ),
};
