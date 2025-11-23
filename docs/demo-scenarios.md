# Demo scenarios

Use these guided flows to exercise the demo operator.

## Finance mini-close

1. Start the CLI: `npm run demo`.
2. Send a few transactions:
   - `tx in 500`
   - `tx out 150`
   - `tx out 50`
   - `tx in 200`
3. Run `summary` to view the current finance snapshot.
4. Inspect `journal` to see the transaction trail and hashes.

Expected final cash balance matches the `examples/finance-scenarios/basic-close.json` scenario: **500**.

## Contradiction detection

1. From the CLI, send `fact sky true`.
2. Send `fact sky false`.
3. The `ContradictionAgent` will journal the conflict and emit a `demo.contradiction` event.
4. Run `journal` to see both the recorded fact and contradiction entries.

## Echo and counter basics

- `echo Hello, BlackRoad!` triggers the echo agent and emits a `demo.echo.response`.
- `inc` increments the counter and emits `counter.updated`. Run `summary` to check the count alongside finance data.
