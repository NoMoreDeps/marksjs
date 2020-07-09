import { IModel } from "./IModel";
import { BaseModel } from "./BaseModel";
import { RendererRepository } from "../Renderer/RendererRepository";
export default class extends BaseModel implements IModel {
    readonly type: string;
    constructor(value: {
        text: string;
    }, _RendererRepository: RendererRepository);
    append(value: {
        text: string;
    }): void;
}
