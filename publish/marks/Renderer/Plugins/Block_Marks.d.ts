import { IRenderingEnine } from "../../Interfaces/IRenderingEngine";
import { TRenderingOption } from "../../Interfaces/IRenderingOption";
import { IMarksRenderer } from "../../Interfaces/IMarksRenderer";
import { IVDom_Element } from "../../Interfaces/IVDom_Element";
import { IDocument } from "../../Interfaces/IDocument";
export declare class BlockMarksRenderer implements IRenderingEnine {
    themeStyles: any;
    globalRefs: any;
    private _succeeded;
    applyTo: string[];
    options: TRenderingOption;
    content: string;
    domContent: IVDom_Element | null;
    type: string;
    weight: number;
    private document;
    getDocument?: () => IDocument;
    cloneRenderer?: () => IMarksRenderer;
    render(): string;
    succeeded(): boolean;
    canProcess(): boolean;
    set(type: string, content: string, options: TRenderingOption): void;
}
