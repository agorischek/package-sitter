import assert from "node:assert/strict";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const packageName = process.argv[2];

function runDollarlint() {
  const executable = path.join(
    process.cwd(),
    "node_modules",
    ".bin",
    process.platform === "win32" ? "dollarlint.cmd" : "dollarlint",
  );
  const result = spawnSync(executable, ["--help"], { stdio: "inherit" });
  assert.equal(result.status, 0, "dollarlint --help failed");
}

export async function smoke(importedPackageName, imported) {
  assert(
    Object.keys(imported).length > 0,
    `${importedPackageName} has no public exports`,
  );

  switch (importedPackageName) {
    case "apposite":
      assert.match(imported.default.render("@@@ all @@@\nHello", "all"), /Hello/);
      break;
    case "badge-roll":
      assert.equal(typeof imported.affix, "function");
      assert.equal(typeof imported.check, "function");
      break;
    case "becomes":
      assert.equal(typeof imported.defineDocument, "function");
      assert.equal(typeof imported.version, "function");
      break;
    case "check-1-2":
      assert.equal(typeof imported.runChecks, "function");
      break;
    case "correlation-vector":
      assert(Object.values(imported).some((value) => typeof value === "function"));
      break;
    case "elementory":
      assert.equal(imported.default("p", "Hello"), "<p>Hello</p>");
      break;
    case "emj": {
      const json = '{"name":"Emojion"}';
      assert.equal(imported.default.parse(imported.default.generate(json)), json);
      break;
    }
    case "@e-n-v/env":
      assert(Object.values(imported).some((value) => typeof value === "function"));
      break;
    case "fill-in-the-blank":
      assert.equal(typeof imported.blank, "function");
      assert.equal(typeof imported.animal(), "string");
      break;
    case "jest-joi":
      assert.equal(typeof imported.matchers, "object");
      assert.equal(typeof imported.toMatchSchema, "function");
      break;
    case "louk":
      assert.equal(imported.default("h1"), "<h1></h1>");
      break;
    case "markdown-it":
      assert.equal(imported.default().render("# Hello"), "<h1>Hello</h1>\n");
      break;
    case "markunit":
      imported.default("# Hello").markup.has("h1");
      break;
    case "multigrain":
      assert.equal(imported.default.yaml({ key: "value" }), "key: value\n");
      break;
    case "semantic-expect":
      assert.equal(typeof imported.makeOpenAIMatchers, "function");
      break;
    case "sibylline":
      assert.equal(imported.default.render("a|||(2018)b|||c", 2018), "abc");
      break;
  }
}

async function main() {
  assert(packageName, "A package name is required");

  if (packageName === "dollarlint") {
    runDollarlint();
    return;
  }

  const consumer = [
    "const packageName = process.env.PACKAGE_SITTER_PACKAGE;",
    "const imported = await import(packageName);",
    "const { smoke } = await import(process.env.PACKAGE_SITTER_SMOKE_MODULE);",
    "await smoke(packageName, imported);",
  ].join("\n");
  const result = spawnSync(process.execPath, ["--input-type=module", "--eval", consumer], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      PACKAGE_SITTER_PACKAGE: packageName,
      PACKAGE_SITTER_SMOKE_MODULE: import.meta.url,
    },
    stdio: "inherit",
  });
  assert.equal(result.status, 0, `${packageName} consumer smoke test failed`);
}

const invokedPath = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href;
if (invokedPath === import.meta.url) {
  await main();
}
