import type { InMemoryDemoEventBus, DemoEvent } from "./demoEventBus";
import type { DemoJournal } from "./demoJournal";

export interface DemoAgentContext {
  bus: InMemoryDemoEventBus;
  journal: DemoJournal;
  log: (msg: string, meta?: unknown) => void;
}

export interface DemoAgent {
  id: string;
  init(ctx: DemoAgentContext): Promise<void>;
  onEvent(event: DemoEvent): Promise<void>;
}
