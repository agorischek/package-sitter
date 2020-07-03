const sibylline = require("sibylline");

test("should include content with no conditions and a single option", () => {
  expect(sibylline.render("a|||b|||c", 2018)).toEqual("abc");
});

test("should include content with simple time match, with no fallback", () => {
  expect(sibylline.render("a|||(2018)b|||c", 2018)).toEqual("abc");
});

test("should include else content with simple time mismatch, with no fallback", () => {
  expect(sibylline.render("a|||(2018)b|||c", 2019)).toEqual("ac");
});
