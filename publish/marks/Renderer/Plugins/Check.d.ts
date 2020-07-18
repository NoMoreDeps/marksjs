import { IRenderingEnine } from "../../Interfaces/IRenderingEngine";
import { TRenderingOption } from "../../Interfaces/IRenderingOption";
import { IDocument } from "../../Interfaces/IDocument";
import { IVDom_Element } from "../../Interfaces/IVDom_Element";
export declare class CheckRenderer implements IRenderingEnine {
    themeStyles: any;
    globalRefs: any;
    private _succeeded;
    applyTo: string[];
    options: TRenderingOption;
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
