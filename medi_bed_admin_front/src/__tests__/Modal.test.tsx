import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Modal from "../components/ModalComp";

const mockOnClose = vi.fn();

describe('Modal Component - Additional Cases', () => {
  beforeEach(() => mockOnClose.mockClear());

  test('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} testId="closedModal" onClose={mockOnClose}>
        <div>Hidden</div>
      </Modal>
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

 

 
});