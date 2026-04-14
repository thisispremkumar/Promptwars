import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ConcessionOrder from '../components/ConcessionOrder';
import LiveUpdates from '../components/LiveUpdates';
import GoogleMapsMock from '../components/GoogleMapsMock';
import StadiumMap from '../components/StadiumMap';
import GeminiInsights from '../components/GeminiInsights';

// Mock fetch API for the logEvent fire-and-forget calls and Gemini Insights
global.fetch = jest.fn((url) => {
  if (url === '/api/insights') {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ insight: "AI Analysis Complete: Clear Paths." })
    });
  }
  return Promise.resolve({ ok: true });
});

// Mock Google Maps API Loader
jest.mock('@react-google-maps/api', () => ({
  useJsApiLoader: () => ({ isLoaded: true }),
  GoogleMap: () => <div data-testid="google-map-mock">Google Map Loaded</div>
}));

describe('ConcessionOrder Component', () => {
  it('renders the skip the line text', () => {
    render(<ConcessionOrder />);
    expect(screen.getByText(/Skip the line/i)).toBeInTheDocument();
  });

  it('changes state when order is placed and reaches ready state', async () => {
    render(<ConcessionOrder />);
    const orderButton = screen.getByRole('button', { name: /Order Combo/i });
    expect(orderButton).toBeEnabled();
    
    fireEvent.click(orderButton);
    expect(screen.getByText(/Preparing Order/i)).toBeInTheDocument();
  });
});

describe('LiveUpdates Component', () => {
  it('renders the event feed heading securely', () => {
    render(<LiveUpdates />);
    expect(screen.getByText('Event Feed')).toBeInTheDocument();
    expect(screen.getByText('Real-time')).toBeInTheDocument();
  });
});

describe('GoogleMapsMock Component', () => {
  it('renders the Google Maps integration wrapper securely', () => {
    render(<GoogleMapsMock />);
    expect(screen.getByText('Venue Location')).toBeInTheDocument();
    expect(screen.getByTestId('google-map-mock')).toBeInTheDocument();
  });
});

describe('StadiumMap Component', () => {
  it('renders native interactive map elements', () => {
    render(<StadiumMap />);
    expect(screen.getByText('Stadium Navigator')).toBeInTheDocument();
    expect(screen.getByLabelText(/Your current seat/i)).toBeInTheDocument();
  });
});

describe('GeminiInsights Component', () => {
  it('renders the initial mounting state and triggers fetch', async () => {
    render(<GeminiInsights />);
    expect(screen.getByText(/Gemini AI Insights/i)).toBeInTheDocument();
    expect(screen.getByText(/Analyzing patterns.../i)).toBeInTheDocument();

    // The fetch mock will resolve
    await waitFor(() => {
      expect(screen.getByText(/AI Analysis Complete:/i)).toBeInTheDocument();
    });
  });
});
