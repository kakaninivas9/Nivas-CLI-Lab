# Nivas CLI Lab

A learning-focused adaptation of Aira CLI Kit for generating API-powered command-line tools.

**Based on [Aira CLI Kit by Aira Group Of Technology](https://github.com/adameehanairagroup/Aira-CLI-Kit), under the MIT license.** See [UPSTREAM.md](UPSTREAM.md) for provenance and [LICENSE](LICENSE) for the preserved copyright. Prepared with Codex assistance; this is an adaptation, not an independently authored framework.

## Improvements

- Reject duplicate commands and collisions with built-in `doctor` and `help` commands.
- Validate command identifiers before inserting them into generated JavaScript.
- Restrict API URLs to HTTP/HTTPS and validate credential environment variable names.
- Run an offline study demonstration API with input validation and an 8 KiB request limit.
- Cover configuration failures and HTTP behavior with regression tests and GitHub Actions.

## Run locally

Requires Node.js 22 and npm. Nothing is published to npm.

```sh
npm ci --ignore-scripts
npm run build
npm run build --workspace=@aira/runtime
npm test
```

Validate and generate the study example:

```sh
node dist/cli.js config validate -c examples/study/aira.config.json
node dist/cli.js build -c examples/study/aira.config.json
```

Start the offline demonstration server:

```sh
node examples/study/server.mjs
```

In another terminal, call it directly (PowerShell):

```powershell
Invoke-RestMethod http://127.0.0.1:8787/chat -Method Post -ContentType application/json -Body '{"input":"binary search"}'
```

The response is a deterministic study checklist, not AI inference. The server binds only to localhost and requires no key. Generated applications retain the upstream `@aira/runtime` dependency; installing them standalone may require a local workspace link. The direct HTTP demo works independently.

## Scope and limitations

This is an educational CLI-generator project, not a trained AI model, production service, or plant disease detector. The inherited runtime and plugin system have not received a full security audit. Use trusted configs and plugins and keep API keys out of repository files.

For the inherited commands and architecture, see [the upstream README](UPSTREAM-README.md). Original branding in that document describes the source project.
