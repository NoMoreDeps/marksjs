import { IRenderingEnine } from "../../Interfaces/IRenderingEngine";
import { TRenderingOption } from "../../Interfaces/IRenderingOption";
import { IVDom_Element } from "../../Interfaces/IVDom_Element";
import { IDocument } from "../../Interfaces/IDocument";
declare type TTableRenderingoptions = TRenderingOption & {
    format?: "markdown" | "csv";
    separator?: string;
};
export declare class TableRenderer implements IRenderingEnine {
    themeStyles: any;
    globalRefs: any;
    private _succeeded;
    applyTo: string[];
    options: TTableRenderingoptions;
    domContent: IVDom_Element | null;
    content: string;
    type: string;
    weight: number;
    private document;
    getDocument?: () => IDocument;
    render(): string;
    succeeded(): boolean;
    canProcess(): boolean;
    set(type: string, content: string, options: TRenderingOption): void;
}
export {};
