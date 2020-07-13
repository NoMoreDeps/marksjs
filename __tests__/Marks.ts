import { MarksRenderer, Plugins } from "../src/Index";
import { assert } from "console";

describe("Test dom", () => {
  it("Should be empty", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));

    const elt = r.render(``);
    expect(elt.outerHTML).toBe("<div><p></p></div>");
  });
})

describe("Emphasis", () => {
  it("Should render italic", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));

    let elt = r.render(`This is *Italic*`);
    expect(elt.outerHTML).toBe("<div><p><span>This is <em>Italic</em></span></p></div>");

    elt = r.render(`This is _Italic_`);
    expect(elt.outerHTML).toBe("<div><p><span>This is <em>Italic</em></span></p></div>");
  });

  it("Should render bold", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));

    let elt = r.render(`This is **Bold**`);
    expect(elt.outerHTML).toBe("<div><p><span>This is <b>Bold</b></span></p></div>");

    elt = r.render(`This is __Bold__`);
    expect(elt.outerHTML).toBe("<div><p><span>This is <b>Bold</b></span></p></div>");
  });

  it("Should render underline", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));

    const elt = r.render(`This is ~underline~`);
    expect(elt.outerHTML).toBe(`<div><p><span>This is <span style="text-decoration: underline">underline</span></span></p></div>`);
  });

  it("Should render stroke", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));

    const elt = r.render(`This is ~~stroke~~`);
    expect(elt.outerHTML).toBe(`<div><p><span>This is <span style="text-decoration: line-through">stroke</span></span></p></div>`);
  });

  it("Should render inline quote", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));

    const elt = r.render(`This is \`inline quote\``);
    expect(elt.outerHTML).toBe(`<div><p><span>This is <code>inline quote</code></span></p></div>`);
  });

  it("Should render inline quote", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    const elt = r.render(`This is __*Bold & Italic*__`);
    expect(elt.outerHTML).toBe(`<div><p><span>This is <b><em>Bold &amp; Italic</em></b></span></p></div>`);
  });

  it("Should render inline quote", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    const elt = r.render(`This is *Italic*
    This is **Bold**
    This is ~underline~
    This is ~stroke~
    This is \`inline quote\``);
    expect(elt.outerHTML).toBe(`<div><p><span>This is <em>Italic</em>    This is <b>Bold</b>    This is <span style=\"text-decoration: underline\">underline</span>    This is <span style=\"text-decoration: underline\">stroke</span>    This is <code>inline quote</code></span></p></div>`);
  });

  
  
})