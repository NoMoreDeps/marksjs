import { BaseModel }          from "./BaseModel"                    ;
import { IModel }             from "./IModel"                       ;
import Text                   from "./Text"                         ;
import { RendererRepository } from "../Renderer/RendererRepository" ;

export default class extends Text {
  readonly type : string = "HEAD";

  constructor(value?: {text: string}, _RendererRepository?: RendererRepository) {
    super(value, _RendererRepository);
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
}
