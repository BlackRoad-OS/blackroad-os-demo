# BlackRoad OS Demo

This repository hosts a **safe, in-memory playground** for experimenting with BlackRoad OS concepts. It mirrors the shapes of the real operator and finance layer without touching production systems or secrets.

## What lives here

- A mini in-process operator with an in-memory event bus and journal.
- Example agents (echo, counter, finance, contradiction) that subscribe to demo events.
- A CLI (`npm run demo`) to publish events, inspect state, and view journal entries.
- Example event payloads and finance scenarios you can replay.

## Quick start

```bash
npm install
npm run demo
```

The CLI will start and present a prompt. Type `help` to see available commands.

## Included demo agents

- **EchoAgent**: responds to `demo.echo` events and emits `demo.echo.response`.
- **CounterAgent**: increments on `counter.increment` and emits `counter.updated`.
- **DemoFinanceAgent**: tracks simple cash balances from `finance.transaction` events and emits `finance.summary.updated`.
- **ContradictionAgent**: detects conflicting `demo.fact` events and emits `demo.contradiction`.

## Safety

Everything runs locally, in memory, and uses toy data only. Journaled entries are not persisted outside the process. Treat this repository as a sandbox for experimenting with BlackRoad OS patterns.
