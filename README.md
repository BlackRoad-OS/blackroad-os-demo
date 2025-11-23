# BlackRoad OS Demo

A safe **playground and showcase** for BlackRoad OS patterns. This repository runs a miniature operator, example agents, and a CLI so you can experiment without touching production systems or real data.

## Quick start

```bash
npm install
npm run demo
```

Type `help` inside the CLI for available commands:

- `echo <message>`
- `inc`
- `tx in|out <amount>`
- `fact <key> <true|false>`
- `summary`
- `journal`

## What this demo includes

- **Mini operator**: In-memory event bus and journal inspired by the real BlackRoad OS operator.
- **Demo agents**: Echo, counter, finance, and contradiction detectors.
- **Examples**: Sample events and finance scenarios in `examples/` and `config/demo-config.json` for reference.

## Docs

- [Overview](docs/overview.md)
- [Adding an agent](docs/adding-an-agent.md)
- [Demo scenarios](docs/demo-scenarios.md)

## Safety notice

This repo is for demonstrations only. It contains no real secrets or production integrations. Journals and state live only in memory while the process is running.

## Future TODOs

- Minimal web UI for showing event streams.
- Dockerfile for quick spin-up.
- Optional integration with the real `blackroad-os-operator` backend once available.
