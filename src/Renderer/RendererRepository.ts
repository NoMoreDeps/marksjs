import { IRenderingEnine }  from "../Interfaces/IRenderingEngine";
import { TRenderingOption } from "../Interfaces/IRenderingOption";

export class RendererRepository {
  protected refs: Array<IRenderingEnine> = [];
  protected hash: { [key: string]: Array<IRenderingEnine>} = {}

  clear() {
    this.hash = {};
  }

  register(engine: IRenderingEnine) {
    this.refs.push(engine);

    engine.applyTo.forEach(_ => {
      if (!(_ in this.hash)) {
        this.hash[_] = [];
      }

      this.hash[_].push(engine);
    });
  }

  getByType(type: string, source: { content: string, options: TRenderingOption}) {
    return this.hash[type]?.filter(_ => {
      _.set(type, source.content, source.options);
      return _.canProcess();
    }) ?? [];
  }

  clone(): RendererRepository {
    const copy = new RendererRepository();
    this.refs.forEach(_ =>  copy.register(new ((_ as Object).constructor as new () => any)()));
    return copy;
  }
}
