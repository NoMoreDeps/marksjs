import { BaseModel } from "./BaseModel";
import { IModel } from "./IModel";
import { RendererRepository } from "../Renderer/RendererRepository";
export default class extends BaseModel implements IModel {
    type: string;
    constructor(value: {
        text: string;
    }, _RendererRepository: RendererRepository);
    append(value: {
        text: string;
    }): void;
    parse(): void;
}
