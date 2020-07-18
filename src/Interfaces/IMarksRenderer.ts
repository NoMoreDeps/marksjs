import { IRenderingEnine } from "./IRenderingEngine";
import { IVDom_Element } from "./IVDom_Element";

export interface IMarksRenderer {
  clone(): IMarksRenderer;
  internalRender(source: string, noEmit?: boolean, target?: IVDom_Element): IVDom_Element;
  renderFromHtmlNode(templateId: string, targetSelector?: string): void;
  /**
   * Register a new rendering plugin
   * @param plugin A rendering plugin to add
   */
  registerRenderers(...plugins: IRenderingEnine[]): void;
}
