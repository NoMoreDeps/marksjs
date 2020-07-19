import { IMarksRenderer, TRenderingOption, IRenderingEnine } from "@marks-js/marks";
import { IVDom_Element } from "@marks-js/marks/Interfaces/IVDom_Element";
import { IDocument } from "@marks-js/marks/Interfaces/IDocument";
export declare class BlockMermaidRenderer implements IRenderingEnine {
    themeStyles: any;
    globalRefs: any;
    private _succeeded;
    applyTo: string[];
    options: TRenderingOption;
    content: string;
    domContent: IVDom_Element | null;
    type: string;
    weight: number;
    cloneRenderer?: () => IMarksRenderer;
    getDocument?: () => IDocument;
    private _version;
    private _selector;
    private document;
    constructor({ skipInit, version, selector }?: {
        skipInit?: boolean;
        version?: string;
        selector?: string;
    });
    render(): string;
    succeeded(): boolean;
    canProcess(): boolean;
    set(type: string, content: string, options: TRenderingOption): void;
    renderFinished(targetElement: IVDom_Element | undefined): Promise<void>;
}
