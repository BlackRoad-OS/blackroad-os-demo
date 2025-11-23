import crypto from "crypto";
import { DemoAgent, DemoAgentContext } from "../demo-operator/demoAgentContext";
import { DemoEvent } from "../demo-operator/demoEventBus";

export class CounterAgent implements DemoAgent {
  id = "demo.counter";
  private ctx: DemoAgentContext | undefined;
  private count = 0;

  getCount(): number {
    return this.count;
  }

  async init(ctx: DemoAgentContext): Promise<void> {
    this.ctx = ctx;
    ctx.bus.subscribe("counter.increment", (event) => this.onEvent(event));
    ctx.log("CounterAgent initialized.");
  }

  async onEvent(event: DemoEvent): Promise<void> {
    if (!this.ctx) return;
    this.count += 1;
    const journalEntry = this.ctx.journal.journal(this.id, "increment", {
      previous: this.count - 1,
      new: this.count,
      payload: event.payload
    });
    this.ctx.log("CounterAgent updated count", journalEntry);

    await this.ctx.bus.publish({
      id: crypto.randomUUID(),
      type: "counter.updated",
      source: this.id,
      timestamp: new Date().toISOString(),
      payload: { count: this.count }
    });
  }
}
