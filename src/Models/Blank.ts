import { BaseModel }          from "./BaseModel"                    ;
import { IModel }             from "./IModel"                       ;
import { RendererRepository } from "../Renderer/RendererRepository" ;

export default class extends BaseModel implements IModel {
  readonly type : string = "BLANK";

  constructor(value?: {text: string}, _RendererRepository?: RendererRepository) {
    super(_RendererRepository);
    if (!value) return;
    
    this.reset();
    this.source = "@";
    this.parse();
  }

  append(value: {text: string}) {
    this.source += "@";
    this.parse();
  }

  parse() {
    this.cleanSource = this.source;
  }
}
