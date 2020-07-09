import { TRenderingOption } from "./IRenderingOption" ;
import { IMarksRenderer }   from "./IMarksRenderer"  ;

export interface IRenderingEnine {
  globalRefs     : any                 ;
  themeStyles    : any                 ;
  weight         : number              ;
  applyTo        : Array<string>       ;
  options        : TRenderingOption    ;
  content        : string              ;
  domContent     : HTMLElement | null  ;
  cloneRenderer ?: () => IMarksRenderer ;
  render         : () => string        ;
  canProcess     : () => boolean       ;
  succeeded      : () => boolean       ;
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
