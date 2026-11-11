# Upstream attribution

This project is a separately hosted adaptation of [Aira CLI Kit](https://github.com/adameehanairagroup/Aira-CLI-Kit), originally by Aira Group Of Technology.

Source revision: `a3c6b9baeea2912e96eccaa1b13ea27c53d42aed`.

The original MIT license and copyright notice are retained in LICENSE. Most generator and runtime code remains upstream work. This repository is not affiliated with or endorsed by the upstream author.

Changes in this adaptation, prepared with Codex assistance:

- HTTP/HTTPS API URL validation.
- Command identifier validation and duplicate/reserved command checks.
- Environment variable name validation to catch accidentally pasted keys.
- An offline, deterministic study API with input and request size checks.
- Regression tests and a CI workflow.

The repository name does not imply original authorship of the underlying framework. Internal `aira` config filenames and `@aira/runtime` names remain for compatibility.

Upstream moderation, release publishing, and matrix CI workflows are omitted; this adaptation uses its own read-only build/test workflow.
