import BeaconFeed from '../../components/BeaconFeed';
import { DEFAULT_BEACON_URL } from '../../lib/constants';

export default function StatusPage() {
  return (
    <div className="space-y-4">
      <header className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-3xl font-bold">Real-time Status</h1>
        <p className="mt-2 text-white/80">
          Connected to <span className="font-semibold text-white">{DEFAULT_BEACON_URL}/stream</span>. Server-Sent Events keep
          the capsule feed updated live — no client polling.
        </p>
      </header>
      <BeaconFeed />
    </div>
  );
}
