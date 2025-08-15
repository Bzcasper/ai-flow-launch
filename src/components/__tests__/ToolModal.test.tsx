import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToolModal } from '../ToolModal';

// Since ToolModal uses react-router Link, mock a minimal Router
import { MemoryRouter } from 'react-router-dom';

describe('ToolModal', () => {
  const tool = { id: 'tool-42', title: 'Answer Tool', description: 'desc', url: 'https://example.com' };

  it('renders when open and hides when closed', () => {
    const { rerender } = render(
      <MemoryRouter>
        <ToolModal isOpen={true} onClose={() => {}} tool={tool} onDownload={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText('Answer Tool')).toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <ToolModal isOpen={false} onClose={() => {}} tool={tool} onDownload={() => {}} />
      </MemoryRouter>
    );

    // Dialog might unmount or hide; title should not be visible
    expect(screen.queryByText('Answer Tool')).not.toBeInTheDocument();
  });

  it('calls onClose when X button clicked', () => {
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <ToolModal isOpen={true} onClose={onClose} tool={tool} onDownload={() => {}} />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole('button');
    const closeBtn = buttons[buttons.length - 1];
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });
});
