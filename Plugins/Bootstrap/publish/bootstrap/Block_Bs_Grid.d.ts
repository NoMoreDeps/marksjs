import { IMarksRenderer, TRenderingOption, IRenderingEnine } from "@marks-js/marks";
export declare class BlockBsGridRenderer implements IRenderingEnine {
    themeStyles: any;
    globalRefs: any;
    private _succeeded;
    applyTo: string[];
    options: TRenderingOption;
    content: string;
    domContent: HTMLElement | null;
    type: string;
    weight: number;
    cloneRenderer?: () => IMarksRenderer;
    render(): string;
    succeeded(): boolean;
    canProcess(): boolean;
    set(type: string, content: string, options: TRenderingOption): void;
}
