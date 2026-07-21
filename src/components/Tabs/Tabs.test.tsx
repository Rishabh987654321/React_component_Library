import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from '../../test-utils/a11y';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

describe('Tabs', () => {
  it('has no automated accessibility violations', async () => {
    const { container } = render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders tabs with roving tabindex and switches active panel on click', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab1).toHaveAttribute('tabIndex', '0');
    expect(tab2).toHaveAttribute('aria-selected', 'false');
    expect(tab2).toHaveAttribute('tabIndex', '-1');
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    fireEvent.click(tab2);

    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('tabIndex', '0');
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });
});
