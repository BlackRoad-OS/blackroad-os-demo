import { DemoFinanceAgent } from "../src/agents/demoFinanceAgent";
import { InMemoryDemoEventBus } from "../src/demo-operator/demoEventBus";
import { DemoJournal } from "../src/demo-operator/demoJournal";
import { DemoAgentContext } from "../src/demo-operator/demoAgentContext";

describe("DemoFinanceAgent", () => {
  it("tracks cash balance and totals", async () => {
    const bus = new InMemoryDemoEventBus();
    const journal = new DemoJournal();
    const finance = new DemoFinanceAgent();
    const ctx: DemoAgentContext = {
      bus,
      journal,
      log: () => {}
    };

    await finance.init(ctx);

    await bus.publish({
      id: "t1",
      type: "finance.transaction",
      source: "test",
      timestamp: new Date().toISOString(),
      payload: { type: "in", amount: 200 }
    });

    await bus.publish({
      id: "t2",
      type: "finance.transaction",
      source: "test",
      timestamp: new Date().toISOString(),
      payload: { type: "out", amount: 50 }
    });

    const summary = finance.getSummary();
    expect(summary.cashBalance).toBe(150);
    expect(summary.totalIn).toBe(200);
    expect(summary.totalOut).toBe(50);
  });
});
