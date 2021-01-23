import Item from "../../src/Models/Block";

describe("Block Model", () => {
  it("should construct without value", () => {
    const item = new Item(null as unknown as any);
    expect(item.source).toBe("");
  });

  it("should construct with options", () => {
    const item = new Item({
      text: `[marks emp]{{
      some text
}}`});
    expect(item.source).toBe("");
  });
  it("should construct with blank value", () => {
    const item = new Item({ text: `` });
    expect(item.source).toBe("");
  });
})