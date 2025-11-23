# Adding a new demo agent

This repo mirrors the shape of the real BlackRoad OS operator. Follow these steps to add your own demo agent.

1. **Create the agent file** in `src/agents/` and implement the `DemoAgent` interface.
   - Subscribe to relevant event types inside `init` using the `ctx.bus.subscribe` method.
   - Use `ctx.journal.journal` to record actions and `ctx.log` for console diagnostics.
2. **Register the agent** in `src/demo-operator/demoRegistry.ts` so it gets constructed and initialized when the demo starts.
3. **Wire commands (optional)** in `src/cli/runDemo.ts` to make it easy to trigger your agent from the CLI.
4. **Run the demo** with `npm run demo` and try your new events.
5. **Inspect the journal** with the `journal` command to confirm your agent is journaling the expected entries.

Use the existing `EchoAgent`, `CounterAgent`, and `DemoFinanceAgent` for concrete patterns to copy.
