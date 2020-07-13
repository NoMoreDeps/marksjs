import { MarksRenderer, Plugins } from "../src/Index";

function createRenderer() {
  const r = new MarksRenderer();
  r.registerRenderers(...Plugins.map(_ => new _()));
  return r;
}

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

  it("Should render Bold & Italic", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    const elt = r.render(`This is __*Bold & Italic*__`);
    expect(elt.outerHTML).toBe(`<div><p><span>This is <b><em>Bold &amp; Italic</em></b></span></p></div>`);
  });

  it("Should render multiline emphasis", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    const elt = r.render(`This is *Italic*  
This is **Bold**  
This is ~underline~  
This is ~stroke~  
This is \`inline quote\``);
    expect(elt.outerHTML).toBe(`<div><p><span>This is <em>Italic</em>  <br>This is <b>Bold</b>  <br>This is <span style=\"text-decoration: underline\">underline</span>  <br>This is <span style=\"text-decoration: underline\">stroke</span>  <br>This is <code>inline quote</code></span></p></div>`);
  });
});

describe("Ordered lists", () => {
  const expectedSimpleList = "<div><p><ol><li>Item 1</li><li>Item 2</li><li>Item 3</li></ol></p></div>";
  const expectedNestedList = "<div><p><ol><li>Item 1</li><li>Item 2<ol><li>Item 2.1<ol><li>Item 2.1.1</li></ol></li><li>Item 2.2</li></ol></li><li>Item 3</li></ol></p></div>"
  const expectedNestedListNoConflict = "<div><h1> Heading</h1><p><ol><li>Item 1</li><li>Item 2<ol><li>Item 2.1<ol><li>Item 2.1.1</li></ol></li><li>Item 2.2</li></ol></li><li>Item 3</li></ol></p><h1> Heading</h1></div>"
  it("Should render list starting with 1", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    const elt = r.render(`1. Item 1
1. Item 2
1. Item 3`);
    expect(elt.outerHTML).toBe(expectedSimpleList);
  });

  it("Should render list starting with any number from 0 to 9", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    const elt = r.render(`0. Item 1
8. Item 2
1. Item 3`);
    expect(elt.outerHTML).toBe(expectedSimpleList);
  });

  it("Should render list starting with the generic symbol", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    const elt = r.render(`#. Item 1
#. Item 2
#. Item 3`);
    expect(elt.outerHTML).toBe(expectedSimpleList);
  });


  it("Should render nested list starting with 1", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    const elt = r.render(`1. Item 1
1. Item 2
  1. Item 2.1
    1. Item 2.1.1
  1. Item 2.2
1. Item 3`);
    expect(elt.outerHTML).toBe(expectedNestedList);
  });

  it("Should render nested list starting with any number from 0 to 9", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    const elt = r.render(`9. Item 1
1. Item 2
  8. Item 2.1
    2. Item 2.1.1
  6. Item 2.2
0. Item 3`);
    expect(elt.outerHTML).toBe(expectedNestedList);
  });

  it("Should render nested list starting with the generic symbol", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    const elt = r.render(`#. Item 1
#. Item 2
  #. Item 2.1
    #. Item 2.1.1
  #. Item 2.2
#. Item 3`);
    expect(elt.outerHTML).toBe(expectedNestedList);
  });

  it("Should render nested list starting with the generic symbol without conflicting with Heading", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    const elt = r.render(`# Heading
#. Item 1
#. Item 2
  #. Item 2.1
    #. Item 2.1.1
  #. Item 2.2
#. Item 3
# Heading`);
    expect(elt.outerHTML).toBe(expectedNestedListNoConflict);
  });
});

describe("Unordered lists", () => {
  const expectedSimpleList =  "<div><p><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul></p></div>";
  const expectedNestedList = "<div><p><ul><li>Item 1</li><li>Item 2<ul><li>Item 2.1<ul><li>Item 2.1.1</li></ul></li><li>Item 2.2</li></ul></li><li>Item 3</li></ul></p></div>";

  it("Should render simple unordered list", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    const elt = r.render(`* Item 1
* Item 2
* Item 3`);
    expect(elt.outerHTML).toBe(expectedSimpleList);
  });

  it("Should render nested unordered list", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    const elt = r.render(`* Item 1
* Item 2
  * Item 2.1
    * Item 2.1.1
  * Item 2.2
* Item 3`);
    expect(elt.outerHTML).toBe(expectedNestedList);
  });
});

describe("Heading", () => {
  it("Should render Heading 1 to 6 with #", () => {
    const r = createRenderer();
    for(let i = 1; i <= 6; i++) {
      const elt = r.render(' Heading'.padStart(i + ' Heading'.length, "#"));

      expect(elt.outerHTML).toBe(`<div><h${i}> Heading</h${i}></div>`);
    }
  });
  it("Should render Heading 1 to 6 with =", () => {
    const r = createRenderer();
    for(let i = 1; i <= 6; i++) {
      const elt = r.render(`Heading
${"".padStart(i , "=")}`);
      expect(elt.outerHTML).toBe(`<div><h${i}> Heading</h${i}></div>`);
    }
  });
});

describe("Blockquote", () => {
  it("Should render inline quote", () => {
    const expected = "<div><p><blockquote><div><p><span>This is a blockquote</span></p></div></blockquote></p></div>";
    const r = createRenderer();

    const elt = r.render('> This is a blockquote');

    expect(elt.outerHTML).toBe(expected);
  });

  it("Should render multiline quote", () => {
    const expected = "<div><p><blockquote><div><p><span>This is a multiline quotation.  <br>Now you know how to do !</span></p></div></blockquote></p></div>";
    const r = createRenderer();

    const elt = r.render(`> This is a multiline quotation.  
> Now you know how to do !`);

    expect(elt.outerHTML).toBe(expected);
  });

  it("Should render emphasis inside blockquote", () => {
    const expected = "<div><p><blockquote><div><p><span>This text can use <b>bold</b> or <em>italic</em>  <br>and so much <b><em><code>more</code></em></b>...</span></p></div></blockquote></p></div>";
    const r = createRenderer();

    const elt = r.render(`> This text can use **bold** or *italic*  
> and so much ***\`more\`***...`);

    expect(elt.outerHTML).toBe(expected);
  });
});

describe("Task", () => {
  it("Should render todo task", () => {
    const expected = "<div><p><ul><li style=\"list-style-type: none;\"><input type=\"checkbox\" style=\"margin-right: 5px;\"><span>Todo task</span></li></ul></p></div>";
    const r = createRenderer();
    
    const elt = r.render('- [ ] Todo task');

    expect(elt.outerHTML).toBe(expected);
  });

  it("Should render done task", () => {
    const expected = "<div><p><ul><li style=\"list-style-type: none;\"><input type=\"checkbox\" checked=\"checked\" style=\"margin-right: 5px;\"><span>It is done</span></li></ul></p></div>";
    const r = createRenderer();
    
    const elt = r.render('- [x] It is done');

    expect(elt.outerHTML).toBe(expected);
  });

  it("Should render tasks", () => {
    const expected = "<div><p><ul><li style=\"list-style-type: none;\"><input type=\"checkbox\" style=\"margin-right: 5px;\"><span>Todo 1</span></li><li style=\"list-style-type: none;\"><input type=\"checkbox\" checked=\"checked\" style=\"margin-right: 5px;\"><span>Done 1</span></li></ul></p></div>";
    const r = createRenderer();
    
    const elt = r.render(`- [ ] Todo 1
- [x] Done 1`);

    expect(elt.outerHTML).toBe(expected);
  });
})

/**
 it("Should render inline quote", () => {
    const expected = "";
    const r = createRenderer();
    
    const elt = r.render('');

    expect(elt.outerHTML).toBe(expected);
  });
 */