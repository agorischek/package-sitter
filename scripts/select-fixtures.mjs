import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { fixtures } from "./fixtures.mjs";

const { BASE_SHA: baseSha, EVENT_NAME: eventName } = process.env;
const fixtureDirectories = readdirSync(new URL("../fixtures/", import.meta.url), {
  withFileTypes: true,
})
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

assert.deepEqual(
  fixtureDirectories,
  fixtures,
  "scripts/fixtures.mjs must list every fixture directory",
);

if (eventName !== "pull_request" || !baseSha) {
  console.log(JSON.stringify(fixtures));
  process.exit(0);
}

const changedPaths = execFileSync("git", [
  "diff",
  "--name-only",
  `${baseSha}...HEAD`,
], { encoding: "utf8" })
  .trim()
  .split("\n")
  .filter(Boolean);

const fixtureChanges = changedPaths
  .map((file) => file.match(/^fixtures\/([^/]+)\//)?.[1])
  .filter((fixture) => fixture && fixtures.includes(fixture));
const onlyFixtureChanges = changedPaths.every((file) => file.startsWith("fixtures/"));
const selected = onlyFixtureChanges && fixtureChanges.length > 0
  ? [...new Set(fixtureChanges)].sort()
  : fixtures;

console.log(JSON.stringify(selected));
