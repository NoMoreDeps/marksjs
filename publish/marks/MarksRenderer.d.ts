import { IRenderingEnine } from "./Interfaces/IRenderingEngine";
import { RendererRepository } from "./Renderer/RendererRepository";
import { IMarksRenderer } from "./Interfaces/IMarksRenderer";
import { VDom_Element } from "./VDom/Html/VDom_Element";
import { IVDom_Element } from "./Interfaces/IVDom_Element";
export declare class MarksRenderer implements IMarksRenderer {
    protected _rendererRepo: RendererRepository;
    protected _globalRefs: any;
    protected _themeStyles: any;
    renderFinished?: () => void;
    manualTrigger: boolean;
    context: any;
    targetRender: "Dom" | "Text";
    /**
     * Creates a new renderer instance
     * @param repo The Renderer repository
     */
    constructor(repo?: RendererRepository);
    /**
     * Clones the current renderer but keeps all configuration
     */
    clone(): MarksRenderer;
    /**
     * Set the theme and styles
     * @param themeStyles
     */
    setThemeStyle(themeStyles: any): void;
    /**
     * Add more styles to the current renderer
     * @param themeStyles
     */
    addThemeStyle(themeStyles: any): void;
    /**
     * Used for internal render / nested renderer block
     * @param source Template to render
     * @param noEmit If true will not trigger the end rendering event
     * @param target The Dom target node
     */
    internalRender(source: string, noEmit?: boolean, target?: VDom_Element): VDom_Element;
    triggerRenderFinished(targetRenderer: IVDom_Element): void;
    /**
     * Render the markdown template
     * @param templateId Template Id
     * @param targetSelector Target dom element selector, if not specified, document.body will be used
     */
    renderFromHtmlNode(templateId: string, targetSelector?: string): void;
    renderToText(template: string): string;
    /**
     * Render a Marks document to teh target or to a new Dom node
     * @param template The template to parse
     * @param target The target Dom node
     */
    render(template: string, target?: HTMLElement | string): HTMLElement;
    /**
     * Register a new rendering plugin
     * @param plugin A rendering plugin to add
     */
    registerRenderers(...plugins: IRenderingEnine[]): void;
}
