import { IRenderingEnine } from "../../Interfaces/IRenderingEngine";
import { TRenderingOption } from "../../Interfaces/IRenderingOption";
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
    domContent: HTMLElement | null;
    content: string;
    type: string;
    weight: number;
    render(): string;
    succeeded(): boolean;
    canProcess(): boolean;
    set(type: string, content: string, options: TRenderingOption): void;
}
export {};
