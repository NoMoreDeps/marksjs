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

describe("Ordered lists", () => {
    it("Should render list starting with 1", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));

    testHtmlAndTextWithSnapshot(r,`1. Item 1
    1. Item 2
    1. Item 3`);
  });

  it("Should render list starting with any number from 0 to 9", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    testHtmlAndTextWithSnapshot(r,`0. Item 1
8. Item 2
1. Item 3`);
  });

  it("Should render list starting with the generic symbol", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    testHtmlAndTextWithSnapshot(r,`#. Item 1
#. Item 2
#. Item 3`);
  });


  it("Should render nested list starting with 1", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    testHtmlAndTextWithSnapshot(r,`1. Item 1
1. Item 2
  1. Item 2.1
    1. Item 2.1.1
  1. Item 2.2
1. Item 3`);
  });

  it("Should render nested list starting with any number from 0 to 9", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    testHtmlAndTextWithSnapshot(r,`9. Item 1
1. Item 2
  8. Item 2.1
    2. Item 2.1.1
  6. Item 2.2
0. Item 3`);
  });

  it("Should render nested list starting with the generic symbol", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    testHtmlAndTextWithSnapshot(r,`#. Item 1
#. Item 2
  #. Item 2.1
    #. Item 2.1.1
  #. Item 2.2
#. Item 3`);
  });

  it("Should render nested list starting with the generic symbol without conflicting with Heading", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    testHtmlAndTextWithSnapshot(r,`# Heading
#. Item 1
#. Item 2
  #. Item 2.1
    #. Item 2.1.1
  #. Item 2.2
#. Item 3
# Heading`);
  });
});

describe("Unordered lists", () => {
   it("Should render simple unordered list", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    testHtmlAndTextWithSnapshot(r,`* Item 1
* Item 2
* Item 3`);
  });

  it("Should render nested unordered list", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));
    testHtmlAndTextWithSnapshot(r,`* Item 1
* Item 2
  * Item 2.1
    * Item 2.1.1
  * Item 2.2
* Item 3`);
  });
});

describe("Heading", () => {
  it("Should render Heading 1 to 6 with #", () => {
    const r = createRenderer();
    for(let i = 1; i <= 6; i++) {
      testHtmlAndTextWithSnapshot(r,' Heading'.padStart(i + ' Heading'.length, "#"));
    }
  });
  it("Should render Heading 1 to 6 with =", () => {
    const r = createRenderer();
    for(let i = 1; i <= 6; i++) {
      testHtmlAndTextWithSnapshot(r,`Heading
${"".padStart(i , "=")}`);
    }
  });
});

describe("Blockquote", () => {
  it("Should render inline quote", () => {
    const r = createRenderer();

    testHtmlAndTextWithSnapshot(r,'> This is a blockquote');
  });

  it("Should render multiline quote", () => {
    const r = createRenderer();

    testHtmlAndTextWithSnapshot(r,`> This is a multiline quotation.  
> Now you know how to do !`);
  });

  it("Should render emphasis inside blockquote", () => {
    const r = createRenderer();

    testHtmlAndTextWithSnapshot(r,`> This text can use **bold** or *italic*  
> and so much ***\`more\`***...`);
  });
});

describe("Task", () => {
  it("Should render todo task", () => {
    const r = createRenderer();
    
    testHtmlAndTextWithSnapshot(r,'- [ ] Todo task');
  });

  it("Should render done task", () => {
    const r = createRenderer();
    
    testHtmlAndTextWithSnapshot(r,'- [x] It is done');
  });

  it("Should render tasks", () => {
    const r = createRenderer();
    
    testHtmlAndTextWithSnapshot(r,`- [ ] Todo 1
- [x] Done 1`);
  });
});

describe("Table", () => {
  it("Should render table", () => {
    const r = createRenderer();
    
    testHtmlAndTextWithSnapshot(r,`| Tables        | Are           | Cool  |
|---------------|---------------|-------|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |`);
  });

  it("Should render with left / right align", () => {
    const r = createRenderer();
    
    testHtmlAndTextWithSnapshot(r,`|A|B|C|
|--|--:|:--:|
|X|X|X|`);
  });
});

describe("Code block", () => {
  it("Should render code block", () => {
    const r = createRenderer();
    
    testHtmlAndTextWithSnapshot(r,`\`\`\`
  Place some code here
\`\`\``); 
  });

  it("Should render code block with color", () => {
    const r = createRenderer();
    
    testHtmlAndTextWithSnapshot(r,`\`\`\`javascript
  class Hello {
    sayHello() {
      return "Hello Kitty";
    }
  }
\`\`\``);
  });
});

describe("Link / Image / Ruler", () => {
  it("Should render Link", () => {
    const r = createRenderer();
    
    testHtmlAndTextWithSnapshot(r,`[Wikipedia](https://wikipedia.com "new")`);
  });

  it("Should render Image", () => {
    const r = createRenderer();
    
    testHtmlAndTextWithSnapshot(r,`![Wikipedia](https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png "Wikipedia Logo")`);
  });

  it("Should render Ruler", () => {
    const r = createRenderer();
    
    testHtmlAndTextWithSnapshot(r,`___`);
  });
});

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
