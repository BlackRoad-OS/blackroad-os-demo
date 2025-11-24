export const DEFAULT_GATEWAY_URL = process.env.GATEWAY_URL || 'http://localhost:4000';
export const DEFAULT_BEACON_URL = process.env.BEACON_URL || 'http://localhost:5000';
export const JWT_TOKEN = process.env.DEMO_JWT || '';

export const DEMO_STEPS = [
  'Authenticate with Core UI (mock)',
  'Register a new agent',
  'Trigger a workflow job',
  'Observe live Beacon updates'
];
