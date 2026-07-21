import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from '../../test-utils/a11y';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

describe('Card', () => {
  it('has no automated accessibility violations', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>Body content</CardContent>
      </Card>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders card subcomponents', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>Body content</CardContent>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });
});
