import { TRenderingOption }   from "../Interfaces/IRenderingOption" ;
import { RendererRepository } from "../Renderer/RendererRepository" ;
import { IModel }             from "./IModel"                       ;
import { IVDom_Element }      from "../Interfaces/IVDom_Element"    ;
import { IDocument }          from "../Interfaces/IDocument"        ;
import { Document }           from "../VDom/Html/Document"          ;

export type TModel  = BaseModel & IModel;

export class BaseModel {
  source      : string               = ""   ;
  cleanSource : string               = ""   ;
  output      : string               = ""   ;
  domElement  : IVDom_Element | null = null ;
  options     : TRenderingOption     = {}   ;
  processed   : number               = 0    ;
  dirty       : boolean              = false;
  document    : IDocument            = new Document("Dom");

  constructor(private _RendererRepository?: RendererRepository) {}

  reset() {
    this.cleanSource = "" ;
    this.output      = "" ;
    this.options     = {} ;
    this.processed   = 0  ;
    this.parse();
  }

  process(context: any) {
    this.domElement = this.document.createElement(this.options.pElt ?? "p");
    const renderers = this._RendererRepository!.getByType((this as unknown as IModel).type, this.get()).sort((a, b) => b.weight - a.weight);
    renderers.forEach((_, idx) => {
      _.context = context;
     if (idx === 0) {
        this.output = _.render();
        if (_.domContent) {
          this.domElement?.appendChild(_.domContent);
          _.domContent = null;
        }
        this.processed++;
      } else {
        _.set((this as unknown as IModel).type, this.output, this.options);
        if (_.canProcess()) {
          this.output = _.render();
          if (_.domContent) {
            this.domElement?.appendChild(_.domContent);
            _.domContent = null;
          }
          this.processed++;
        }
      }
      do {
        _.set((this as unknown as IModel).type, this.output, this.options);
        if (_.succeeded()) {
          this.output = _.render();
          if (_.domContent) {
            this.domElement?.appendChild(_.domContent);
            _.domContent = null;
          }
          this.processed++;
        }
      } while(_.succeeded())
    });
    if (this.domElement.childElementCount === 0) {
      this.domElement = null;
    }
    if (this.domElement?.childElementCount === 1) {
      if (this.options.noPElt) {
        this.domElement = this.domElement.getChildItem(0);
      } else {
        switch(this.domElement.getChildItem(0)?.tagName.toLowerCase()) {
          case "br":
          case "p":
          case "hr":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            this.domElement = this.domElement.getChildItem(0);
            break;
        }
      }
    }
    if (this.options["mk-show"]) {
      if (!context[this.options["mk-show"]]) {
        this.domElement = null;
      }
    }
  }

  append(value: {text: string}): void {}

  parse(): void { 
    this.cleanSource = this.source; 
  }

  parseOptions(opts: string) {
    const _options = opts.split(" ").filter((_,i) => i === 0 || _.length > 0);
    if (!_options[0].includes(":")) {
      this.options.name = _options.shift() as string;
    }
    _options.forEach(opt => {
      const elt = opt.split(":");
      this.options[elt[0]] = elt.length === 2 ? elt[1] : "true";
    });
  }

  get() {
    return {
      type    : (this as unknown as IModel).type,
      content : this.cleanSource,
      options : this.options
    };
  } 

  clone() {
    const duplicated = new ((this as Object).constructor as any)();
    duplicated["_RendererRepository"] = this["_RendererRepository"] ;
    duplicated.options                = this.options                ;
    duplicated.source                 = this.source                 ;
    duplicated.cleanSource            = this.cleanSource            ;
    duplicated.output                 = this.output                 ;

    return duplicated;
  }
}
