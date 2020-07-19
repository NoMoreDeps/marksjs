import { IRenderingEnine, TRenderingOption } from "@marks-js/marks";
import { IVDom_Element } from "@marks-js/marks/Interfaces/IVDom_Element";
import { IDocument } from "@marks-js/marks/Interfaces/IDocument";
export declare class BlockBsButtonRenderer implements IRenderingEnine {
    themeStyles: any;
    globalRefs: any;
    private _succeeded;
    applyTo: string[];
    options: TRenderingOption;
    content: string;
    domContent: IVDom_Element | null;
    type: string;
    weight: number;
    getDocument?: () => IDocument;
    private document;
    render(): string;
    succeeded(): boolean;
    canProcess(): boolean;
    set(type: string, content: string, options: TRenderingOption): void;
}
