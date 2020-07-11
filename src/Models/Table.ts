import { IModel }             from "./IModel"                       ;
import { BaseModel }          from "./BaseModel"                    ;
import { RendererRepository } from "../Renderer/RendererRepository" ;

export default class extends BaseModel implements IModel {
  readonly type: string = "TABLE";
  constructor(value?: {text: string}, _RendererRepository?: RendererRepository) {
    super(_RendererRepository);
    if (!value) return;
    
    let source = value.text;
    let opts = "";

    if (value.text.includes("::- ")) {
      [source, opts] = value.text.split("::-");
    }
    
    this.source = source;
    if (opts.length) {
      this.parseOptions(opts);
     // console.log("TBL OPT", this.options)
    }
  }

  append(value: { text: string }) {
    this.source += "\n";
    this.source += value.text;
    this.parse();
  }
}