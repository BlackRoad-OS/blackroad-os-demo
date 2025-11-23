import crypto from "crypto";
import readline from "readline";
import { startDemo } from "../demo-operator/demoRunner";
import { DemoFinanceAgent } from "../agents/demoFinanceAgent";
import { CounterAgent } from "../agents/counterAgent";
import { DemoAgent } from "../demo-operator/demoAgentContext";

function printHelp() {
  console.log(`Available commands:
  echo <message>        - send demo.echo event
  inc                   - increment counter
  tx in <amount>        - record incoming finance transaction
  tx out <amount>       - record outgoing finance transaction
  fact <key> <true|false> - record a fact (contradiction demo)
  summary               - print finance summary and counter
  journal               - print journal entries
  help                  - show this help
  exit | quit           - stop the demo`);
}

async function run() {
  const { bus, journal, agents } = await startDemo();
  const finance = agents.find((a): a is DemoFinanceAgent => (a as DemoAgent).id === "demo.finance") as
    | DemoFinanceAgent
    | undefined;
  const counter = agents.find((a): a is CounterAgent => (a as DemoAgent).id === "demo.counter") as
    | CounterAgent
    | undefined;

  console.log("BlackRoad OS Demo ready. Type 'help' for commands.");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "blackroad-demo> "
  });

  rl.prompt();

  rl.on("line", async (line) => {
    const [cmd, ...rest] = line.trim().split(/\s+/);

    try {
      if (cmd === "echo") {
        const msg = rest.join(" ");
        await bus.publish({
          id: crypto.randomUUID(),
          type: "demo.echo",
          source: "cli",
          timestamp: new Date().toISOString(),
          payload: { message: msg }
        });
      } else if (cmd === "inc") {
        await bus.publish({
          id: crypto.randomUUID(),
          type: "counter.increment",
          source: "cli",
          timestamp: new Date().toISOString(),
          payload: { reason: "manual" }
        });
        if (counter) {
          console.log(`Counter is now ${counter.getCount()}`);
        }
      } else if (cmd === "tx") {
        const direction = rest[0];
        const amount = Number(rest[1]);
        if ((direction === "in" || direction === "out") && !Number.isNaN(amount)) {
          await bus.publish({
            id: crypto.randomUUID(),
            type: "finance.transaction",
            source: "cli",
            timestamp: new Date().toISOString(),
            payload: { type: direction, amount }
          });
          if (finance) {
            console.log("Finance summary:", finance.getSummary());
          }
        } else {
          console.log("Usage: tx in|out <amount>");
        }
      } else if (cmd === "summary") {
        if (finance) {
          console.log("Finance summary:", finance.getSummary());
        }
        if (counter) {
          console.log("Counter:", counter.getCount());
        }
      } else if (cmd === "fact") {
        const key = rest[0];
        const value = rest[1];
        if (key && (value === "true" || value === "false")) {
          await bus.publish({
            id: crypto.randomUUID(),
            type: "demo.fact",
            source: "cli",
            timestamp: new Date().toISOString(),
            payload: { key, value }
          });
        } else {
          console.log("Usage: fact <key> <true|false>");
        }
      } else if (cmd === "journal") {
        console.log(journal.getEntries());
      } else if (cmd === "help" || cmd === "?") {
        printHelp();
      } else if (cmd === "exit" || cmd === "quit") {
        rl.close();
        return;
      } else if (cmd === "") {
        // ignore empty line
      } else {
        console.log("Unknown command. Type 'help' for options.");
      }
    } catch (err) {
      console.error("Error handling command:", err);
    }

    rl.prompt();
  });

  rl.on("close", () => {
    console.log("Exiting demo.");
    process.exit(0);
  });
}

run().catch((err) => {
  console.error("Failed to start demo:", err);
  process.exit(1);
});
