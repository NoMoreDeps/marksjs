import Text                   from "./Text"                         ;
import { BaseModel }          from "./BaseModel"                    ;
import { RendererRepository } from "../Renderer/RendererRepository" ;

export default class extends BaseModel {
  readonly type : string = "CODE";

  constructor(value?: {text: string}, _RendererRepository?: RendererRepository) {
    super(_RendererRepository);
    if (!value) return;
    
    this.parseOptions(`language:${value.text.trim().substr(3)}`);
    super.source = "";
  }

  append(value: { text: string }) {
    this.source.length > 0 && (this.source += "\n");
    this.source += value.text;
    this.parse();
  }
}
