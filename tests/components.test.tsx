import { render, screen } from '@testing-library/react';
import TourStep from '../components/TourStep';
import BeaconFeed from '../components/BeaconFeed';

vi.mock('../lib/beacon', () => ({
  connectBeacon: () => ({ close: vi.fn() })
}));

vi.mock('../lib/trpc', () => ({
  listAgents: async () => [],
  gatewayVersion: async () => 'test'
}));

describe('components', () => {
  it('renders tour steps', () => {
    render(<TourStep />);
    expect(screen.getByText('Tour the Core UI + Operator')).toBeInTheDocument();
  });

  it('shows beacon shell', () => {
    render(<BeaconFeed />);
    expect(screen.getByText('Beacon feed')).toBeInTheDocument();
  });
});
