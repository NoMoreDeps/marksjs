import { MarksRenderer, Plugins } from "../src/Index";

function createRenderer() {
  const r = new MarksRenderer();
  r.registerRenderers(...Plugins.map(_ => new _()));
  return r;
}

function testHtmlAndTextWithSnapshot(r: MarksRenderer, template: string) {
  let elt = r.render(template);
  expect(elt.outerHTML).toMatchSnapshot(template);
  let eltStr = r.renderToText(template, -1);
  expect(eltStr).toMatchSnapshot(template);
}

describe("Test dom", () => {
  it("Should be empty", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));

    const elt = r.render(``);
    expect(elt.outerHTML).toMatchSnapshot();
  });
})

describe("Emphasis", () => {
  it("Should render italic", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));

    testHtmlAndTextWithSnapshot(r, `This is *Italic*`);
    testHtmlAndTextWithSnapshot(r, `This is _Italic_`);
  });

  it("Should render bold", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));

    testHtmlAndTextWithSnapshot(r, `This is **Bold**`);
    testHtmlAndTextWithSnapshot(r, `This is __Bold__`);
  });

  it("Should render underline", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));

    testHtmlAndTextWithSnapshot(r, `This is ~underline~`);
  });

  it("Should render stroke", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));

    testHtmlAndTextWithSnapshot(r, `This is ~~stroke~~`);
  });

  it("Should render inline quote", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));

    testHtmlAndTextWithSnapshot(r, `This is \`inline quote\``);
  });

  it("Should render Bold & Italic", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    testHtmlAndTextWithSnapshot(r, `This is __*Bold & Italic*__`);
  });

  it("Should render multiline emphasis", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));

    testHtmlAndTextWithSnapshot(r, `This is *Italic*  
    This is **Bold**  
    This is ~underline~  
    This is ~stroke~  
    This is \`inline quote\``);
  });
});
/*
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
});

describe("Table", () => {
  it("Should render table", () => {
    const expected = `<div><p><table>
    <thead>
      <tr>
              <th align="left"> Tables        </th>
        <th align="left"> Are           </th>
        <th align="left"> Cool  </th>
      </tr>
    </thead><tbody>
    
      <tr>
              <td align="left"> col 3 is      </td>
        <td align="left"> right-aligned </td>
        <td align="left"> $1600 </td>
      </tr>

      <tr>
              <td align="left"> col 2 is      </td>
        <td align="left"> <em>centered</em>    </td>
        <td align="left">   $12 </td>
      </tr>
    </tbody>
  </table></p></div>`;
    const r = createRenderer();
    
    const elt = r.render(`| Tables        | Are           | Cool  |
|---------------|---------------|-------|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |`);
    
    expect(elt.outerHTML).toBe(expected);
  });

  it("Should render with left / right align", () => {
    const expected = `<div><p><table>
    <thead>
      <tr>
              <th align="left">A</th>
        <th align="right">B</th>
        <th align="center">C</th>
      </tr>
    </thead><tbody>
    
      <tr>
              <td align="left">X</td>
        <td align="right">X</td>
        <td align="center">X</td>
      </tr>
    </tbody>
  </table></p></div>`;
    const r = createRenderer();
    
    const elt = r.render(`|A|B|C|
|--|--:|:--:|
|X|X|X|`);
    
    expect(elt.outerHTML).toBe(expected);
  });
});

describe("Code block", () => {
  it("Should render code block", () => {
    const expected = "<div><p><pre><code>  Place some code here</code></pre></p></div>";
    const r = createRenderer();
    
    const elt = r.render(`\`\`\`
  Place some code here
\`\`\``);
    
    expect(elt.outerHTML).toBe(expected);
  });

  it("Should render code block with color", () => {
    const expected = `<div><p><pre><code class="language-javascript">  class Hello {
    sayHello() {
      return "Hello Kitty";
    }
  }</code></pre></p></div>`;
    const r = createRenderer();
    
    const elt = r.render(`\`\`\`javascript
  class Hello {
    sayHello() {
      return "Hello Kitty";
    }
  }
\`\`\``);
    
    expect(elt.outerHTML).toBe(expected);
  });
});

describe("Link / Image / Ruler", () => {
  it("Should render Link", () => {
    const expected = "<div><p><span><a href=\"https://wikipedia.com\" target=\"new\">Wikipedia</a></span></p></div>";
    const r = createRenderer();
    
    const elt = r.render(`[Wikipedia](https://wikipedia.com "new")`);
    
    expect(elt.outerHTML).toBe(expected);
  });

  it("Should render Image", () => {
    const expected = "<div><p><span><img src=\"https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png\" alt=\"Wikipedia\" title=\"Wikipedia Logo\"></span></p></div>";
    const r = createRenderer();
    
    const elt = r.render(`![Wikipedia](https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png "Wikipedia Logo")`);
    
    expect(elt.outerHTML).toBe(expected);
  });

  it("Should render Ruler", () => {
    const expected = "<div><hr></div>";
    const r = createRenderer();
    
    const elt = r.render(`___`);
    
    expect(elt.outerHTML).toBe(expected);
  });
});*/

/**
describe("", () => {
  it("Should ", () => {
    const expected = "";
    const r = createRenderer();
    
    const elt = r.render(``);
    
    expect(elt.outerHTML).toBe(expected);
  });
});
  */