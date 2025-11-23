import crypto from "crypto";
import { DemoAgent, DemoAgentContext } from "../demo-operator/demoAgentContext";
import { DemoEvent } from "../demo-operator/demoEventBus";

export class EchoAgent implements DemoAgent {
  id = "demo.echo";
  private ctx: DemoAgentContext | undefined;

  async init(ctx: DemoAgentContext): Promise<void> {
    this.ctx = ctx;
    ctx.bus.subscribe("demo.echo", (event) => this.onEvent(event));
    ctx.log("EchoAgent initialized.");
  }

  async onEvent(event: DemoEvent): Promise<void> {
    if (!this.ctx) return;
    this.ctx.log(`EchoAgent received event ${event.id}`, event.payload);
    const journalEntry = this.ctx.journal.journal(this.id, "received", event.payload);
    this.ctx.log("EchoAgent journaled", journalEntry);

    await this.ctx.bus.publish({
      id: crypto.randomUUID(),
      type: "demo.echo.response",
      source: this.id,
      timestamp: new Date().toISOString(),
      payload: { originalId: event.id, message: event.payload }
    });
  }
}
