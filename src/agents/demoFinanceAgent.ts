import crypto from "crypto";
import { DemoAgent, DemoAgentContext } from "../demo-operator/demoAgentContext";
import { DemoEvent } from "../demo-operator/demoEventBus";

export interface FinanceSummary {
  cashBalance: number;
  totalIn: number;
  totalOut: number;
}

export class DemoFinanceAgent implements DemoAgent {
  id = "demo.finance";
  private ctx: DemoAgentContext | undefined;
  private summary: FinanceSummary = {
    cashBalance: 0,
    totalIn: 0,
    totalOut: 0
  };

  getSummary(): FinanceSummary {
    return { ...this.summary };
  }

  async init(ctx: DemoAgentContext): Promise<void> {
    this.ctx = ctx;
    ctx.bus.subscribe("finance.transaction", (event) => this.onEvent(event));
    ctx.log("DemoFinanceAgent initialized.");
  }

  async onEvent(event: DemoEvent): Promise<void> {
    if (!this.ctx) return;
    const payload = event.payload as { amount: number; type: "in" | "out" };
    if (!payload || typeof payload.amount !== "number" || (payload.type !== "in" && payload.type !== "out")) {
      this.ctx.log("DemoFinanceAgent received invalid payload", payload);
      return;
    }

    if (payload.type === "in") {
      this.summary.totalIn += payload.amount;
      this.summary.cashBalance += payload.amount;
    } else {
      this.summary.totalOut += payload.amount;
      this.summary.cashBalance -= payload.amount;
    }

    const journalEntry = this.ctx.journal.journal(this.id, "finance.transaction", {
      ...payload,
      snapshot: this.getSummary()
    });
    this.ctx.log("DemoFinanceAgent recorded transaction", journalEntry);

    await this.ctx.bus.publish({
      id: crypto.randomUUID(),
      type: "finance.summary.updated",
      source: this.id,
      timestamp: new Date().toISOString(),
      payload: this.getSummary()
    });
  }
}
