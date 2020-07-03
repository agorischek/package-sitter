const markunit = require("markunit");
const readme = markunit(
  "#Markunit\n\nMarkunit is a Markdown unit testing library.\n\n```sh\nnpm i -D markunit\n```"
);

test("should have a title", () => {
  readme.markup.has("h1");
});
test("should not have the library's name in lower case in the copy", () => {
  readme.copy.no("markunit");
});
