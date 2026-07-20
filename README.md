# Package Sitter

Emergency post-publish CI for packages maintained by Alex Gorischek.

[![CI](https://github.com/agorischek/package-sitter/actions/workflows/ci.yml/badge.svg)](https://github.com/agorischek/package-sitter/actions/workflows/ci.yml)

Each monitored package has an independent consumer fixture with its own lockfile. Dependabot checks the fixtures every six hours and opens an update as soon as it sees a new monitored-package release. The pull request installs, audits, and smoke-tests only the affected fixture. Pushes to `master` and manual workflow runs exercise every fixture.

This structure keeps a vulnerability or packaging problem in one published package attributable to that package instead of blocking unrelated update pull requests.

## Monitored packages

| Package | Fixture |
| --- | --- |
| [`@e-n-v/env`](https://www.npmjs.com/package/@e-n-v/env) | `e-n-v-env` |
| [`apposite`](https://www.npmjs.com/package/apposite) | `apposite` |
| [`badge-roll`](https://www.npmjs.com/package/badge-roll) | `badge-roll` |
| [`becomes`](https://www.npmjs.com/package/becomes) | `becomes` |
| [`check-1-2`](https://www.npmjs.com/package/check-1-2) | `check-1-2` |
| [`correlation-vector`](https://www.npmjs.com/package/correlation-vector) | `correlation-vector` |
| [`dollarlint`](https://www.npmjs.com/package/dollarlint) | `dollarlint` |
| [`elementory`](https://www.npmjs.com/package/elementory) | `elementory` |
| [`emj`](https://www.npmjs.com/package/emj) | `emj` |
| [`fill-in-the-blank`](https://www.npmjs.com/package/fill-in-the-blank) | `fill-in-the-blank` |
| [`jest-joi`](https://www.npmjs.com/package/jest-joi) | `jest-joi` |
| [`louk`](https://www.npmjs.com/package/louk) | `louk` |
| [`markdown-it`](https://www.npmjs.com/package/markdown-it) | `markdown-it` |
| [`markunit`](https://www.npmjs.com/package/markunit) | `markunit` |
| [`multigrain`](https://www.npmjs.com/package/multigrain) | `multigrain` |
| [`semantic-expect`](https://www.npmjs.com/package/semantic-expect) | `semantic-expect` |
| [`sibylline`](https://www.npmjs.com/package/sibylline) | `sibylline` |

`verify-repo` is intentionally deferred until a release is available that installs without unpublished workspace peer dependencies.

## Adding a package

1. Add `fixtures/<slug>/package.json` with an exact dependency version and a test script that calls `scripts/smoke.mjs`.
2. Generate its lockfile with `npm install --package-lock-only --ignore-scripts --prefix fixtures/<slug>`.
3. Add the slug to `scripts/fixtures.mjs`.
4. Add a meaningful public API or CLI assertion to `scripts/smoke.mjs`.
5. Add the dependency name to both `allow` and `cooldown.exclude` in `.github/dependabot.yml`.
6. Add it to the table above and run the fixture's install, high-severity audit, and test locally.

Supporting dependencies needed by a fixture may be present in its manifest, but should not be added to Dependabot's `allow` list unless Package Sitter is meant to track their releases too.
