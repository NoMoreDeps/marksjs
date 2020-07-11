import { TRenderingOption } from "../Interfaces/IRenderingOption";
import { RendererRepository } from "../Renderer/RendererRepository";
import { IModel } from "./IModel";
export declare type TModel = BaseModel & IModel;
export declare class BaseModel {
    private _RendererRepository?;
    source: string;
    cleanSource: string;
    output: string;
    domElement: HTMLElement | null;
    options: TRenderingOption;
    processed: number;
    dirty: boolean;
    constructor(_RendererRepository?: RendererRepository | undefined);
    reset(): void;
    process(context: any): void;
    append(value: {
        text: string;
    }): void;
    parse(): void;
    parseOptions(opts: string): void;
    get(): {
        type: string;
        content: string;
        options: TRenderingOption;
    };
    clone(): any;
}
