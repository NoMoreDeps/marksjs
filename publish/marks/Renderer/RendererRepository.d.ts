import { IRenderingEnine } from "../Interfaces/IRenderingEngine";
import { TRenderingOption } from "../Interfaces/IRenderingOption";
export declare class RendererRepository {
    protected refs: Array<IRenderingEnine>;
    protected hash: {
        [key: string]: Array<IRenderingEnine>;
    };
    clear(): void;
    register(engine: IRenderingEnine): void;
    getByType(type: string, source: {
        content: string;
        options: TRenderingOption;
    }): IRenderingEnine[];
    clone(): RendererRepository;
}
