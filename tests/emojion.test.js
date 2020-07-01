const emj = require("emj");

test("Can parse Emojion", () => {
  const emojion = "🙌😶😠🤑😳👡🐘🐁🦉🦒🐖🦉🦏✋";
  const json = '{"name":"Emojion"}';
  expect(emj.parse(emojion)).toEqual(json);
});

test("Can generate Emojion", () => {
  const json = '{"name":"Emojion"}';
  const emojion = "🙌😶😠🤑😳👡🐘🐁🦉🦒🐖🦉🦏✋";
  expect(emj.generate(json)).toEqual(emojion);
});
