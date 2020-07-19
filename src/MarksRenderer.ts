import { IRenderingEnine }    from "./Interfaces/IRenderingEngine" ;
import { RendererRepository } from "./Renderer/RendererRepository" ;
import Text                   from "./Models/Text"                 ;
import Head                   from "./Models/Head"                 ;
import ListU                  from "./Models/ListU"                ;
import ListO                  from "./Models/ListO"                ;
import Table                  from "./Models/Table"                ;
import Block                  from "./Models/Block"                ;
import Code                   from "./Models/Code"                 ;
import Check                  from "./Models/Check"                ;
import Blank                  from "./Models/Blank"                ;
import { TModel }             from "./Models/BaseModel"            ;
import BlockQ                 from "./Models/BlockQ"               ;
import { IMarksRenderer }     from "./Interfaces/IMarksRenderer"   ;
import { formatMinSpace }     from "./Renderer/Plugins/Helper"     ;
import { Document }           from "./VDom/Html/Document"          ;
import { VDom_Element }       from "./VDom/Html/VDom_Element"      ;
import { IVDom_Element } from "./Interfaces/IVDom_Element";

export class MarksRenderer implements IMarksRenderer {
  protected _rendererRepo  : RendererRepository     ;
  protected _globalRefs    : any                    ;
  protected _themeStyles   : any                    ;
  public renderFinished   ?: () => void             ;
  public manualTrigger     : boolean = false        ;
  public context           : any = {}               ;
  public targetRender      : "Dom" | "Text" = "Dom" ;

  /**
   * Creates a new renderer instance
   * @param repo The Renderer repository
   */
  constructor(repo ?: RendererRepository) {
    this._rendererRepo = repo ?? new RendererRepository();
    this._globalRefs = {};
  }

  /**
   * Clones the current renderer but keeps all configuration
   */
  clone() {
    const res = new MarksRenderer(this._rendererRepo.clone());
    res["_themeStyles"] = this._themeStyles ;
    res["_globalRefs"]  = this._globalRefs  ;
    res["context"]      = this.context      ;
    res["_rendererRepo"]["refs"].forEach(_ => {
      _.cloneRenderer = this.clone.bind(this);
      _.getDocument = () => new Document(this.targetRender);
    });
    return res;
  }

  /**
   * Set the theme and styles
   * @param themeStyles 
   */
  setThemeStyle(themeStyles: any) {
    this._themeStyles = themeStyles;
  }

  /**
   * Add more styles to the current renderer
   * @param themeStyles 
   */
  addThemeStyle(themeStyles: any) {
    this._themeStyles = {
      ...this._themeStyles,
      ...themeStyles
    };
  }

  /**
   * Used for internal render / nested renderer block
   * @param source Template to render
   * @param noEmit If true will not trigger the end rendering event
   * @param target The Dom target node
   */
  internalRender(source: string, noEmit: boolean = true, target?: VDom_Element): VDom_Element {
    const doc = formatMinSpace(source).replace(/\r\n/g,"\n");
    this._rendererRepo["refs"].forEach(_ => {
      _.globalRefs  = this._globalRefs;
      _.themeStyles = this._themeStyles;
    });

    // Prepare document parsing
    let lines = doc.replace(/\\r\\n/g, "\n").split("\n") ?? [];

    const an = [
      { type: "LIST-O"  , rgx: /^\s*([0-9]+|#{1})\.\s(.*)/      , apply: ["-"]                      },
      { type: "HEAD"    , rgx: /^\s*#{1,6}(.*)/                 , apply: ["-"]                      },
      { type: "HEAD-B"  , rgx: /^\s*=+\s*/                      , apply: ["-"]                      },
      { type: "CHECK"   , rgx: /^\s*\-\s*\[[ x]\](.*)/          , apply: ["-"]                      },
      { type: "LIST-U"  , rgx: /^\s*[\*-]\s+(.*)/               , apply: ["-"]                      },
      { type: "TABLE"   , rgx: /^\s*\|(.*)\|\s*/                , apply: ["-"]                      },
      { type: "BLOCK-Q" , rgx: /^\s*\>(.*)/                     , apply: ["-"]                      },
      { type: "BLOCK-B" , rgx: /^\s*\[.*?\]\s*\{\{\s*/          , apply: ["-"]     , state: "BLOCK" },
      { type: "BLOCK-E" , rgx: /^\s*\}\}\s*$/                   , apply: ["BLOCK"] , state: "-"     },
      { type: "CODE-B"  , rgx: /^[`]{3}\w*\s*/                  , apply: ["-"]     , state: "CODE"  },
      { type: "CODE-E"  , rgx: /^[`]{3}\s*$/                    , apply: ["CODE"]  , state: "-"     }
    ];

    const res: Array<{ type: string; text: string; }> = [];
    let state: string = "-";

    const BlockB = an.filter(_ => _.type === "BLOCK-B")[0];

    let blockLevel = 0;
    let codeLevel = 0;

    const startTime = performance.now();
    lines.forEach(_ => {
      let check = false;
      an.filter(__ => __.apply.includes(state)).forEach(__ => {
        if (!check && __.rgx.test(_)) {
          if (__.type === "BLOCK-E") {
              blockLevel--;
              //console.log("END-LEVEL", blockLevel);
              if (blockLevel > 0) {
                return;
              }
          }
          if (__.type === "BLOCK-B") {
            blockLevel++;
           // console.log("BEG-LEVEL", blockLevel);
          }
          res.push({ type: __.type, text: _ });
          check = true;
          if ("state" in __) {
            state = __["state"] as string;
          }
        }
      })
      if (!check) {
        switch (state) {
          case "BLOCK":
            if (BlockB.rgx.test(_)) {
              blockLevel++;
              //console.log("BEG-LEVEL", blockLevel);
            }
            res.push({ type: "T-TEXT", text: _ });
            break;
          case "CODE":
            res.push({ type: "C-TEXT", text: _ });
            break;
          default:
            if (_.length === 0) {
              res.push({ type: "BLANK", text: "" });
            } else {
              res.push({ type: "TEXT", text: _ });
            }
            break;
        }
      }
    });

    res.filter(_ => _.type === "LIST-U").forEach(_ => {
      if (_.text.trim().startsWith("*") && _.text.trim().endsWith("*")) {
        _.type = "TEXT";
      }
    });

    //console.table(res);

    let currentElt: Block | Code | Table | ListO | ListU | null = null;
    let filteredElts: Array<TModel> = [];

    const inlineModels = {
      "TEXT"  : Text  ,
      "HEAD"  : Head  ,
    };
    
    const multilineModels = {
      "LIST-O"  : ListO  ,
      "LIST-U"  : ListU  ,
      "BLOCK-Q" : BlockQ ,
      "TABLE"   : Table  ,
      "CHECK"   : Check  ,
      "BLANK"   : Blank  ,
    };

    const openCloseElts = {
      "CODE-B"  : Code  ,
      "BLOCK-B" : Block ,
    };

    res
      .forEach(_ => {
        switch (_.type) {
          case "TEXT":
          case "HEAD":
            if (currentElt) {
              filteredElts.push(currentElt);
              currentElt = null;
            }
            filteredElts.push(new inlineModels[_.type](_, this._rendererRepo));
            break;
          case "LIST-O":
          case "LIST-U":
          case "CHECK":
          case "BLOCK-Q":
          case "TABLE":
          case "BLANK":
            if (currentElt && currentElt?.type !== _.type) {
              filteredElts.push(currentElt);
              currentElt = null;
            }
            if (currentElt) {
              currentElt.append(_);
              break;
            }
            currentElt = new multilineModels[_.type](_, this._rendererRepo);
            break;
          case "CODE-B":
          case "BLOCK-B":
            if (currentElt) {
              filteredElts.push(currentElt);
              currentElt = null;
            }
            currentElt = new openCloseElts[_.type](_, this._rendererRepo);
            break;
          case "C-TEXT":
          case "T-TEXT":
            currentElt?.append(_);
            break;
          case "CODE-E":
          case "BLOCK-E":
            currentElt && filteredElts.push(currentElt);
            currentElt = null;
            break;
          case "HEAD-B":
            if (currentElt) {
              filteredElts.push(currentElt);
              currentElt = null;
            }
            if (filteredElts[filteredElts.length - 1].type === "TEXT") {
              const elt = filteredElts.pop();
              const headerInfo = _.text.replace(/=/g, "#");
              filteredElts.push(new Head({
                type: "HEAD",
                text: `${headerInfo} ${elt?.source}`
              } as unknown as { text: string }, this._rendererRepo))
            } else {
              filteredElts.push(new Text(_, this._rendererRepo));
            }
            break;
        }
      });

    if (currentElt !== null) {
      filteredElts.push(currentElt);
    }
    currentElt = null;
    filteredElts.forEach(_ => {
      if (_.type === "TEXT") {
        const ct = _.source.trim();
        switch(ct[0]) {
          case "_":
            if (ct.length > 2) {
              let applyRuler = true;
              for(let i = 0; i < ct.length; i++) {
                ct[i] !== ct[0] && (applyRuler = false);
              }
              if (applyRuler) {
                _.type = "RULER";
              }
            }
            break;
        }
      }
      if (_.type === "TEXT" && currentElt === null) {
        currentElt = _;
        return;
      }
      if (_.type === "TEXT" && currentElt) {
        currentElt.append({ text: _.source });
        _.dirty = true;
        return;
      }
      if (_.type !== "TEXT") {
        currentElt = null;
      }
    });

    filteredElts = filteredElts.filter(_ => _.dirty === false);

    /*console.table(filteredElts.map(_ => ({
      type: _.type,
      source: _.source
    })));*/

    const processedElts = [] as TModel[];

    filteredElts.forEach(_ => {
      if (_.options["mk-repeat"]) {
        //console.log("Trying to repeat");
        const repeatSource = this.context[_.options["mk-repeat"]];
        if (Array.isArray(repeatSource) && repeatSource.length > 0) {
          repeatSource.forEach(rs => {
            const childElt = _.clone();
            childElt.process(rs);
            processedElts.push(childElt);
          });
        }
        return;
      }
      _.process(this.context);
      processedElts.push(_);
      //console.log(_.output);
    });

    const document = new Document(this.targetRender);

    const endTime = performance.now();
    const targetRenderer = target || document.createElement("div");
    processedElts.forEach(_ => _.domElement && targetRenderer.appendChild(_.domElement));
    //console.log(`Processed in ${endTime - startTime} ms`);

    //console.log(noEmit, this.manualTrigger)
    if (!noEmit && !this.manualTrigger && this.targetRender === "Dom") {
      this.triggerRenderFinished(targetRenderer.dom!);
    }
    return targetRenderer as VDom_Element;
  }

  triggerRenderFinished(targetRenderer: HTMLElement) {
    this._rendererRepo["refs"].forEach(_ => _.renderFinished?.(targetRenderer))
    this.renderFinished?.();
  }

  /**
   * Render the markdown template
   * @param templateId Template Id
   * @param targetSelector Target dom element selector, if not specified, document.body will be used
   */
  renderFromHtmlNode(templateId: string, targetSelector ?: string) {
    const _document = new Document(this.targetRender);

    let doc = document.querySelector<HTMLTemplateElement>(templateId)?.innerHTML ?? "";
    var textDecoder = document.createElement("textarea");
    textDecoder.innerHTML = doc;
    doc = textDecoder.value ?? "";

    const renderedDom = this.internalRender(doc, false);

    const targetRenderer = document.querySelector<HTMLElement>(targetSelector ?? "body") ?? document.body;
    targetRenderer.appendChild(renderedDom.toDom()!);
  }

  renderToText(template: string, indentLevel: number = 2) {
    return this.internalRender(template, false).toHtml(indentLevel)
  }

  /**
   * Render a Marks document to teh target or to a new Dom node
   * @param template The template to parse
   * @param target The target Dom node
   */
  render(template: string, target?: HTMLElement | string): HTMLElement {
    const res = this.internalRender(template, false);
    if (target) {
      (typeof target === "string" ? document.querySelector<HTMLElement>(target)! : target).appendChild(res.toDom()!);
    }
    return res.toDom()!;
  }

  /**
   * Register a new rendering plugin
   * @param plugin A rendering plugin to add
   */
  registerRenderers(...plugins: IRenderingEnine[]) {
    // Used if the plugin needs to render Marks recur
    plugins.forEach(plugin => {
      plugin.cloneRenderer = this.clone.bind(this);
      plugin.getDocument = () => new Document(this.targetRender);
      plugin.willInit?.();
      this._rendererRepo.register(plugin);
    });
  }
}