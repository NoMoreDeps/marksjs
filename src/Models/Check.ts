import { BaseModel }          from "./BaseModel"                    ;
import { IModel }             from "./IModel"                       ;
import Text                   from "./Text"                         ;
import { RendererRepository } from "../Renderer/RendererRepository" ;

export default class extends BaseModel {
  readonly type : string = "CHECK";

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
    this.parse();
  }

  append(value: { text: string }) {
    this.source += "\n";
    this.source += value.text;
    this.parse();
  }

  parse() {
    this.cleanSource = this.source;
  }
}
