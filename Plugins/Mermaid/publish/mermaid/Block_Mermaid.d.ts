import { IMarksRenderer, TRenderingOption, IRenderingEnine } from "@marks-js/marks";
export declare class BlockMermaidRenderer implements IRenderingEnine {
    themeStyles: any;
    globalRefs: any;
    private _succeeded;
    applyTo: string[];
    options: TRenderingOption;
    content: string;
    domContent: HTMLElement | null;
    type: string;
    weight: number;
    cloneRenderer?: () => IMarksRenderer;
    private _version;
    private _selector;
    constructor({ skipInit, version, selector }?: {
        skipInit?: boolean;
        version?: string;
        selector?: string;
    });
    render(): string;
    succeeded(): boolean;
    canProcess(): boolean;
    set(type: string, content: string, options: TRenderingOption): void;
    renderFinished(targetElement: HTMLElement | undefined): Promise<void>;
}
