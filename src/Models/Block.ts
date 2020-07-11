import { IModel }             from "./IModel"                       ;
import { BaseModel }          from "./BaseModel"                    ;
import { RendererRepository } from "../Renderer/RendererRepository" ;

export default class extends BaseModel implements IModel {
  readonly type: string = "BLOCK";

  constructor(value?: {text: string}, _RendererRepository?: RendererRepository) {
    super(_RendererRepository);
    if (!value) return;
    
    this.reset();
    this.parseOptions(
      (/^\s*\[(?<options>.*?)\]\s*\{\{/ as any).exec(value.text)?.groups?.["options"] ?? ""
    );
  }

  append(value: { text: string }) {
    this.source.length > 0 && (this.source += "\n");
    this.source += value.text;
    this.parse();
  }
}
