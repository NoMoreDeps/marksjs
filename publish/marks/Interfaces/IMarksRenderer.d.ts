import { IRenderingEnine } from "./IRenderingEngine";
export interface IMarksRenderer {
    clone(): IMarksRenderer;
    internalRender(source: string, noEmit: boolean): HTMLElement;
    renderFromHtmlNode(templateId: string, targetSelector?: string): void;
    /**
     * Register a new rendering plugin
     * @param plugin A rendering plugin to add
     */
    registerRenderers(...plugins: IRenderingEnine[]): void;
}
