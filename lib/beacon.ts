import { DEFAULT_BEACON_URL } from './constants';

export type BeaconMessage = {
  id: string;
  agent: string;
  ts: number;
  level: 'info' | 'warn' | 'error';
  detail: string;
};

export function connectBeacon(onMessage: (payload: BeaconMessage) => void) {
  const source = new EventSource(`${DEFAULT_BEACON_URL}/stream`);
  source.onmessage = (event) => {
    try {
      const parsed = JSON.parse(event.data) as BeaconMessage;
      onMessage(parsed);
    } catch (err) {
      console.error('Failed to parse beacon event', err);
    }
  };
  source.onerror = (event) => {
    console.error('Beacon stream error', event);
  };
  return source;
}
