const louk = require("louk");

test("Can parse Louk", () => {
  const input = "h1\ndiv\n\tp";
  const html = "<h1></h1>\n<div>\n\t<p></p>\n</div>";
  expect(louk(input)).toEqual(html);
});
