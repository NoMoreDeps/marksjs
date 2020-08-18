import { MarksRenderer, Plugins } from "../src/Index";

function createRenderer() {
  const r = new MarksRenderer();
  r.registerRenderers(...Plugins.map(_ => new _()));
  return r;
}

function testHtmlAndTextWithSnapshot(r: MarksRenderer, template: string, forceSecondTemplate?: string) {
  let elt = r.render(template);
  expect(elt.outerHTML).toMatchSnapshot(template);
  let eltStr = r.renderToText(template, -1);
  expect(eltStr).toBe(forceSecondTemplate ?? elt.outerHTML);
}

describe("Test dom", () => {
  it("Should be empty", () => {
    const r = new MarksRenderer();
    r.registerRenderers(...Plugins.map(_ => new _()));

    testHtmlAndTextWithSnapshot(r, ``);
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
    testHtmlAndTextWithSnapshot(r, `This is __*Bold &amp; Italic*__`);
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
  it("Should render === block as text if nothing", () => {
    const r = createRenderer();

    testHtmlAndTextWithSnapshot(r,`Text not heading   
    \\=\\=\\=`, "<div><p><span><span>Text not heading   </span><br><span>    &#61;&#61;&#61;</span></span></p></div>");
    
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

describe("Image Block", () => {
  it("Should render Image block", () => {
    const r = createRenderer();
    
    testHtmlAndTextWithSnapshot(r,`[img width:100px]{{
      "src"   : "https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png",
      "alt"   : "Image",
      "title" : "Me, myself and I"
    }}`);
  });
});


describe("Styles", () => {
  it("Should render theme, variant, classes", () => {
    const r = createRenderer();
    r.setThemeStyle({
      all: {
        theme: {
          dark: ["darkCls"]
        },
        variant: {
          primary: ["primaryCls"]
        }
      }
    })
    testHtmlAndTextWithSnapshot(r,`This is a text ::- classes:myClass1,myClass2 theme:dark variant:primary`);
  });
});

describe("Styles", () => {
  it("Should table block markdown and csv", () => {
    const r = createRenderer();
    
    testHtmlAndTextWithSnapshot(r,`[table format:markdown] {{
      | COL A | COL B   | COL C  |
      |-------|---------|--------|
      | AA    | BB      |CC      |
    }}`);

    testHtmlAndTextWithSnapshot(r, `[table format:csv] {{
      COL A,COL B,COL C
      AA,BB,CC
      }}`);
  });
});

describe("Marks block", () => {
  it("Should render marks block", () => {
    const expected = "";
    const r = createRenderer();
    
    testHtmlAndTextWithSnapshot(r,`[marks]{{
      ### h3 heading
    }}`);
  });
});

describe("HTML Block", () => {
  it("Should render html bock", () => {
    const expected = "";
    const r = createRenderer();
    
    testHtmlAndTextWithSnapshot(r, `[html]{{
      <h3>H3 heading</h3>
    }}`);
  });
});

describe("Nested elements", () => {
  it("Should render inline nested and block nested", () => {
    const expected = "";
    const r = createRenderer();
    
    testHtmlAndTextWithSnapshot(r, `Hello ::- ref:001

Ceci est un @@001@@`);
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
