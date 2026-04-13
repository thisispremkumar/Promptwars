import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ConcessionOrder from '../components/ConcessionOrder';
import LiveUpdates from '../components/LiveUpdates';

// Mock the Logger to avoid credentials error during testing
jest.mock('../lib/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
  }
}));

describe('ConcessionOrder Component', () => {
  it('renders the skip the line text', () => {
    render(<ConcessionOrder />);
    expect(screen.getByText(/Skip the line/i)).toBeInTheDocument();
  });

  it('changes state when order is placed', () => {
    render(<ConcessionOrder />);
    const orderButton = screen.getByRole('button', { name: /Order Combo/i });
    
    // Initial state
    expect(orderButton).toBeEnabled();
    
    // Click button
    fireEvent.click(orderButton);
    
    // Processing state
    expect(screen.getByText(/Preparing Order/i)).toBeInTheDocument();
  });
});

describe('LiveUpdates Component', () => {
  it('renders the event feed heading', () => {
    render(<LiveUpdates />);
    expect(screen.getByText('Event Feed')).toBeInTheDocument();
    expect(screen.getByText('Real-time')).toBeInTheDocument();
  });
});
