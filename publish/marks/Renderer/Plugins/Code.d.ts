import { IRenderingEnine } from "../../Interfaces/IRenderingEngine";
import { TRenderingOption } from "../../Interfaces/IRenderingOption";
import { IVDom_Element } from "../../Interfaces/IVDom_Element";
import { IDocument } from "../../Interfaces/IDocument";
export declare class CodeRenderer implements IRenderingEnine {
    themeStyles: any;
    globalRefs: any;
    private _succeeded;
    applyTo: string[];
    options: TRenderingOption;
    domContent: IVDom_Element | null;
    content: string;
    type: string;
    weight: number;
    private _version;
    private _serverPath;
    private _depName;
    private document;
    getDocument?: () => IDocument;
    constructor({ skipInit, version, serverPath }?: {
        skipInit?: boolean;
        version?: string;
        serverPath?: string;
    });
    render(): string;
    succeeded(): boolean;
    canProcess(): boolean;
    set(type: string, content: string, options: TRenderingOption): void;
    renderFinished(targetElement: IVDom_Element | undefined): Promise<void>;
}
