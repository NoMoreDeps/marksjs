import { IModel }             from "./IModel"                       ;
import { BaseModel }          from "./BaseModel"                    ;
import { RendererRepository } from "../Renderer/RendererRepository" ;

export default class extends BaseModel implements IModel {
  readonly type: string = "BLOCK-Q";

  constructor(value?: {text: string}, _RendererRepository?: RendererRepository) {
    super(_RendererRepository);
    if (!value) return;
    
    this.source = value.text.replace(">", "");
    
    if (this.source.includes("::- ")) {
      const sourceTab  = this.source.split("::-") ;
      this.source = sourceTab[0];
      this.parseOptions(sourceTab[1]);
    }
    
    this.parse();
  }

  append(value: { text: string }) {
    this.source += "\n";
    this.source += value.text.replace(">", "");
    this.parse();
  }
}