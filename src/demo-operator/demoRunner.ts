import { InMemoryDemoEventBus } from "./demoEventBus";
import { DemoJournal } from "./demoJournal";
import { createDemoAgents } from "./demoRegistry";

export async function startDemo() {
  const bus = new InMemoryDemoEventBus();
  const journal = new DemoJournal();

  const agents = createDemoAgents();

  const ctx = {
    bus,
    journal,
    log: (msg: string, meta?: unknown) => {
      if (meta) {
        console.log(`[DEMO] ${msg}`, meta);
      } else {
        console.log(`[DEMO] ${msg}`);
      }
    }
  };

  for (const agent of agents) {
    await agent.init(ctx);
  }

  return { bus, journal, agents };
}
