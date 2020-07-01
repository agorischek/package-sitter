const multigrain = require("multigrain");

test("Convert JSON to CSON", () => {
  const json = '{"key":"value"}';
  const cson = "key: 'value'";
  expect(multigrain.cson(json)).toEqual(cson);
});

test("Convert JSON to PList", () => {
  const json = '{"key":"value"}';
  const plist =
    '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0">\n  <dict>\n    <key>key</key>\n    <string>value</string>\n  </dict>\n</plist>';
  expect(multigrain.plist(json)).toEqual(plist);
});

test("Convert JSON to YAML", () => {
  const json = '{"key":"value"}';
  const yaml = "key: value\n";
  expect(multigrain.yaml(json)).toEqual(yaml);
});

test("Convert JSON to TOML", () => {
  const json = '{"key":"value"}';
  const toml = 'key = "value"\n';
  expect(multigrain.toml(json)).toEqual(toml);
});
