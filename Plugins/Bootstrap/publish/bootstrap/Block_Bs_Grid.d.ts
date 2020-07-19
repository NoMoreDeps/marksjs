import { IMarksRenderer, TRenderingOption, IRenderingEnine } from "@marks-js/marks";
import { IVDom_Element } from "@marks-js/marks/Interfaces/IVDom_Element";
import { IDocument } from "@marks-js/marks/Interfaces/IDocument";
export declare class BlockBsGridRenderer implements IRenderingEnine {
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
    private document;
    render(): string;
    succeeded(): boolean;
    canProcess(): boolean;
    set(type: string, content: string, options: TRenderingOption): void;
}
