import AgentTable from '../components/AgentTable';
import BeaconFeed from '../components/BeaconFeed';
import TourStep from '../components/TourStep';
import { DEMO_STEPS } from '../lib/constants';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-brand-primary/40 via-surface to-black p-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.24em] text-white/70">Demo-Gen-0</p>
        <h2 className="mt-2 text-3xl font-bold">End-to-end BlackRoad OS surface</h2>
        <p className="mt-3 max-w-2xl text-white/80">
          A self-contained showcase that stitches together the Core UI, API Gateway, Operator, and Agent Registry. Explore the
          tour, inspect agents, and watch the live Beacon stream.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/80">
          {DEMO_STEPS.map((step) => (
            <span key={step} className="rounded-full bg-white/10 px-3 py-1">
              {step}
            </span>
          ))}
        </div>
      </section>

      <TourStep />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <AgentTable />
        <BeaconFeed />
      </div>
    </div>
  );
}
