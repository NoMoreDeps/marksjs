import { Document } from "../src/VDom/Html/Document";

import { HtmlParser } from "../src/VDom/Parser/Index";
import { DocumentNode } from "../src/VDom/Parser/Node";

describe("Virtual Dom", () => {
  it("Should render the same", () => {

    const doc = new Document("Dom");
    const elt = doc.createElement("DIV");
    
    elt.setInnerHTML(`
    <div class="first">
      <span class="gb-primary">This is a text</span>
      <div data-process="true">Ceci est un texte</div>
    </div>
    `);

    elt.findFirst(_ => _.tagName === "span")?.setStyle("background-color", "red");

    expect(elt.toHtml(-1)).toBe(elt.toDom()!.outerHTML);
  });
});