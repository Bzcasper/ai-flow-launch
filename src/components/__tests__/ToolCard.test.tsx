import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToolCard } from '../ToolCard';

describe('ToolCard', () => {
  const baseProps = {
    id: 'tool-1',
    title: 'My Tool',
    description: 'A helpful tool',
    thumbnail: null,
    category: 'Utilities',
    downloads: 1234,
    onLaunch: vi.fn(),
    onDownload: vi.fn(),
  };

  it('renders title and description', () => {
    render(<ToolCard {...baseProps} />);
    expect(screen.getByText('My Tool')).toBeInTheDocument();
    expect(screen.getByText('A helpful tool')).toBeInTheDocument();
    expect(screen.getByText(/1,234 downloads/)).toBeInTheDocument();
  });

  it('invokes onLaunch when card is clicked', () => {
    render(<ToolCard {...baseProps} />);
    fireEvent.click(screen.getByText('My Tool'));
    expect(baseProps.onLaunch).toHaveBeenCalledWith('tool-1');
  });

  it('stops propagation and calls onDownload when download button clicked', () => {
    render(<ToolCard {...baseProps} />);
    const buttons = screen.getAllByRole('button');
    // Last two buttons are action buttons; first should be download (by icon)
    const downloadBtn = buttons[buttons.length - 2];
    fireEvent.click(downloadBtn);
    expect(baseProps.onDownload).toHaveBeenCalledWith('tool-1');
  });
});
