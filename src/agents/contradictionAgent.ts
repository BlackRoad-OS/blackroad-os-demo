import crypto from "crypto";
import { DemoAgent, DemoAgentContext } from "../demo-operator/demoAgentContext";
import { DemoEvent } from "../demo-operator/demoEventBus";

type FactValue = "true" | "false";

export class ContradictionAgent implements DemoAgent {
  id = "demo.contradiction";
  private ctx: DemoAgentContext | undefined;
  private beliefs: Record<string, FactValue> = {};

  async init(ctx: DemoAgentContext): Promise<void> {
    this.ctx = ctx;
    ctx.bus.subscribe("demo.fact", (event) => this.onEvent(event));
    ctx.log("ContradictionAgent initialized.");
  }

  async onEvent(event: DemoEvent): Promise<void> {
    if (!this.ctx) return;
    const payload = event.payload as { key: string; value: FactValue };
    if (!payload || typeof payload.key !== "string" || (payload.value !== "true" && payload.value !== "false")) {
      this.ctx.log("ContradictionAgent received invalid payload", payload);
      return;
    }

    const existing = this.beliefs[payload.key];
    if (existing && existing !== payload.value) {
      const journalEntry = this.ctx.journal.journal(this.id, "contradiction", {
        key: payload.key,
        previous: existing,
        incoming: payload.value
      });
      this.ctx.log("ContradictionAgent detected contradiction", journalEntry);

      await this.ctx.bus.publish({
        id: crypto.randomUUID(),
        type: "demo.contradiction",
        source: this.id,
        timestamp: new Date().toISOString(),
        payload: {
          key: payload.key,
          previous: existing,
          incoming: payload.value
        }
      });
    }

    this.beliefs[payload.key] = payload.value;
    this.ctx.journal.journal(this.id, "fact.recorded", payload);
  }
}
