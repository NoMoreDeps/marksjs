import { IRenderingEnine } from "../../Interfaces/IRenderingEngine";
import { TRenderingOption } from "../../Interfaces/IRenderingOption";
import { IVDom_Element } from "../../Interfaces/IVDom_Element";
export declare class InlineQuoteRenderer implements IRenderingEnine {
    themeStyles: any;
    globalRefs: any;
    private _succeeded;
    applyTo: string[];
    options: TRenderingOption;
    content: string;
    domContent: IVDom_Element | null;
    type: string;
    weight: number;
    render(): string;
    succeeded(): boolean;
    canProcess(): boolean;
    set(type: string, content: string, options: TRenderingOption): void;
}
