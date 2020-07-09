import { IRenderingEnine } from "./Interfaces/IRenderingEngine";
import { RendererRepository } from "./Renderer/RendererRepository";
import { IMarksRenderer } from "./Interfaces/IMarksRenderer";
export declare class MarksRenderer implements IMarksRenderer {
    protected _rendererRepo: RendererRepository;
    protected _globalRefs: any;
    protected _themeStyles: any;
    renderFinished?: () => void;
    manualTrigger: boolean;
    constructor(repo?: RendererRepository);
    clone(): MarksRenderer;
    setThemeStyle(themeStyles: any): void;
    internalRender(source: string, noEmit?: boolean, target?: HTMLElement): HTMLElement;
    triggerRenderFinished(targetRenderer: HTMLElement): void;
    /**
     * Render the markdown template
     * @param templateId Template Id
     * @param targetSelector Target dom element selector, if not specified, document.body will be used
     */
    renderFromHtmlNode(templateId: string, targetSelector?: string): void;
    render(template: string, target?: HTMLElement): HTMLElement;
    /**
     * Register a new rendering plugin
     * @param plugin A rendering plugin to add
     */
    registerRenderers(...plugins: IRenderingEnine[]): void;
}
