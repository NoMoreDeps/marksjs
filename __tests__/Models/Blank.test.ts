import Item from "../../src/Models/Blank";

describe("Blank Model", () => {
  it("should append text", () => {
    const item = new Item(null as unknown as any);
    item.append({ text: "---"});
    expect(item.source).toBe("@");
  })

  it("should construct without value", () => {
    const head = new Item(null as unknown as any);
    expect(head.source).toBe("");
  })
})