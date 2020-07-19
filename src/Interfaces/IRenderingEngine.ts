import { TRenderingOption } from "./IRenderingOption" ;
import { IMarksRenderer }   from "./IMarksRenderer"   ;
import { IVDom_Element }    from "./IVDom_Element"    ;
import { IDocument }        from "./IDocument"        ;

export interface IRenderingEnine {
  globalRefs     : any                  ;
  themeStyles    : any                  ;
  weight         : number               ;
  applyTo        : Array<string>        ;
  options        : TRenderingOption     ;
  content        : string               ;
  domContent     : IVDom_Element | null ;
  cloneRenderer ?: () => IMarksRenderer ;
  getDocument   ?: () => IDocument      ;
  context       ?: any                  ;
  render         : () => string         ;
  canProcess     : () => boolean        ;
  succeeded      : () => boolean        ;
  set            : (
    type    : string,
    content : string,
    options : TRenderingOption 
  ) => void;

  /**
   * This method is called once if defined, in order to initalize the plugin with
   * external assets or whatever
   */
  willInit        ?: () => void; 

  /**
   * This method is called if defined when a render has been done
   */
  renderFinished  ?: (mountingPoint: HTMLElement) => void;
}
