# BlackRoad OS Demo

A minimal Node.js example that shows how a third-party app can call BlackRoad OS services. It provides both a CLI and a tiny HTTP endpoint that fetch health information from the Operator and Core services using environment-configured URLs.

## Stack and entry points
- **Language/runtime:** Node.js (uses the built-in `fetch` available in Node 18+; no extra dependencies required).
- **CLI:** `demo.js`
- **Server:** `server.js` (listens on `PORT` and responds on `/` or `/demo`).

## Environment variables
| Name | Description | Default |
| --- | --- | --- |
| `OPERATOR_URL` | Base URL for the Operator service (called with `/system/health`). | `http://localhost:8080` |
| `CORE_URL` | Base URL for the Core service (called with `/health`). | `http://localhost:8081` |
| `PORT` | Port for the demo HTTP server. | `3000` |

Set them locally with a `.env` file, `export`, or inline before running commands.

## Running locally
1. Ensure Node.js 18+ is installed (for native `fetch`).
2. Install dependencies (only needed for the existing CSS dependency):
   ```bash
   npm install
   ```
3. Run the CLI health check:
   ```bash
   OPERATOR_URL=http://localhost:8080 CORE_URL=http://localhost:8081 npm run demo
   ```
   The script prints the Operator and Core health JSON responses (or friendly errors) using the configured URLs.
4. Run the HTTP demo server:
   ```bash
   OPERATOR_URL=http://localhost:8080 CORE_URL=http://localhost:8081 PORT=3000 npm start
   ```
   Then open `http://localhost:3000/demo` (or `/`) to see a JSON payload combining both health checks.

## Railway (optional)
This demo can be deployed as a simple service. Suggested settings:
- `build_command`: `npm install`
- `start_command`: `npm start`
- Expose port `PORT` (Railway will set this automatically) and ensure the service binds to `0.0.0.0` (handled by `server.js`).
- Provide `OPERATOR_URL` and `CORE_URL` via Railway environment variables.

If you only need a local demonstration, you can skip Railway entirely.

## What the demo does
- Reads `OPERATOR_URL` and `CORE_URL` from the environment (with sensible localhost defaults).
- Calls:
  - `OPERATOR_URL/system/health` for overall status.
  - `CORE_URL/health` for Core status.
- Prints or returns the responses in a readable JSON shape, demonstrating how an external application can query BlackRoad OS services.
