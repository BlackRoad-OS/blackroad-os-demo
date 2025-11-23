import { startDemo } from "../src/demo-operator/demoRunner";

describe("demo operator", () => {
  it("journals events from agents", async () => {
    const { bus, journal } = await startDemo();

    await bus.publish({
      id: "test-echo",
      type: "demo.echo",
      source: "test",
      timestamp: new Date().toISOString(),
      payload: { message: "hello" }
    });

    const entries = journal.getEntries();
    expect(entries.length).toBeGreaterThan(0);
    expect(entries[0].actionType).toBeDefined();
  });
});
