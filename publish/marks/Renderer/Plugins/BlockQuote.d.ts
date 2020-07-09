import { IRenderingEnine } from "../../Interfaces/IRenderingEngine";
import { TRenderingOption } from "../../Interfaces/IRenderingOption";
import { MarksRenderer } from "../../MarksRenderer";
export declare class BlockQRenderer implements IRenderingEnine {
    globalRefs: any;
    themeStyles: any;
    private _succeeded;
    applyTo: string[];
    options: TRenderingOption;
    domContent: HTMLElement | null;
    content: string;
    type: string;
    weight: number;
    cloneRenderer?: () => MarksRenderer;
    render(): string;
    succeeded(): boolean;
    canProcess(): boolean;
    set(type: string, content: string, options: TRenderingOption): void;
}
