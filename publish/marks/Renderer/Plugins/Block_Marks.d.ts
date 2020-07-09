import { IRenderingEnine } from "../../Interfaces/IRenderingEngine";
import { TRenderingOption } from "../../Interfaces/IRenderingOption";
import { MarksRenderer } from "../../MarksRenderer";
export declare class BlockMarksRenderer implements IRenderingEnine {
    themeStyles: any;
    globalRefs: any;
    private _succeeded;
    applyTo: string[];
    options: TRenderingOption;
    content: string;
    domContent: HTMLElement | null;
    type: string;
    weight: number;
    cloneRenderer?: () => MarksRenderer;
    render(): string;
    succeeded(): boolean;
    canProcess(): boolean;
    set(type: string, content: string, options: TRenderingOption): void;
}
