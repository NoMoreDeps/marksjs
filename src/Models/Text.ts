import { BaseModel }          from "./BaseModel"                    ;
import { IModel }             from "./IModel"                       ;
import { RendererRepository } from "../Renderer/RendererRepository" ;

export default class extends BaseModel implements IModel {
  type : string = "TEXT";

  constructor(value?: {text: string}, _RendererRepository?: RendererRepository) {
    super(_RendererRepository);
    if (!value) return;

    this.reset();

    this.source = value.text;
    if (this.source.includes("::- ")) {
      const sourceTab  = this.source.split("::-") ;
      this.source = sourceTab[0];
      this.parseOptions(sourceTab[1]);
    }
    if (this.source.endsWith("  ")) {
      this.source += "\n";
    }
    this.parse();
  }

  append(value: { text: string }) {
    this.source += value.text;
    if (value.text.endsWith("  ")) {
      this.source += "\n";
    }
    this.parse();
  }

  parse() {
    this.cleanSource = this.source;
  }
}
