"use strict";

const MarkdownIt = require("markdown-it");

class Converter {
  constructor() {
    this.options = {};
    this.markdown = new MarkdownIt({ html: true });
  }

  setOption(name, value) {
    this.options[name] = value;
  }

  makeHtml(input) {
    return this.markdown.render(input == null ? "" : String(input)).trim();
  }
}

module.exports = { Converter };
