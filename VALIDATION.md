# Validation

Validated on Node.js 22.19.0 on Windows:

- 18 regression tests across configuration and local HTTP behavior.
- Root TypeScript build and @aira/runtime TypeScript build.
- Study configuration validation and CLI generation (seven output files).

Dependency maintenance: compatible `npm audit fix --ignore-scripts` updates reduced the audit count from 21 to 12. Remaining findings affect the inherited Vitest/Vite test tooling, Inquirer editor dependencies, and Zod. npm recommends breaking major upgrades for these remaining findings; those upgrades are not included in this adaptation. Do not treat this repository as security audited. Run `npm audit` for current details. CI checks build and tests; it does not certify dependency security.
