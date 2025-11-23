import crypto from "crypto";
import { startDemo } from "./demoRunner";

async function main() {
  const { bus, journal } = await startDemo();
  console.log("Demo operator started.");

  await bus.publish({
    id: "e1",
    type: "demo.echo",
    source: "demo-cli",
    timestamp: new Date().toISOString(),
    payload: { message: "Hello, BlackRoad!" }
  });

  await bus.publish({
    id: crypto.randomUUID(),
    type: "counter.increment",
    source: "demo-cli",
    timestamp: new Date().toISOString(),
    payload: { reason: "startup" }
  });

  console.log("Initial journal:", journal.getEntries());
}

main().catch((err) => {
  console.error("Error running demo operator:", err);
  process.exit(1);
});
