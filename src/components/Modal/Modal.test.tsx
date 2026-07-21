import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe } from '../../test-utils/a11y';
import { Modal } from './Modal';

describe('Modal', () => {
  it('has no automated accessibility violations when open', async () => {
    const { container } = render(
      <Modal open onClose={() => {}} title="Test Dialog" description="Description">
        <p>Dialog content</p>
      </Modal>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders modal dialog when open is true', () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Test Dialog">
        <p>Dialog content</p>
      </Modal>
    );

    const dialog = screen.getByRole('dialog', { name: 'Test Dialog' });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
  });

  it('calls onClose when escape key is pressed', () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Escape Test">
        <p>Content</p>
      </Modal>
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
