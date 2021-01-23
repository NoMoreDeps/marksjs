import Head from "../../src/Models/Head";

describe("Head Model", () => {
  it("should construct with options", () => {
    const head = new Head({ text: "## Header ::- option"});
    expect(head.source).toBe("## Header ");
  })

  it("should construct without value", () => {
    const head = new Head(null as unknown as any);
    expect(head.source).toBe("");
  })
})