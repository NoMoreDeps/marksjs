import Text from "./Text";
import { RendererRepository } from "../Renderer/RendererRepository";
export default class extends Text {
    readonly type: string;
    constructor(value?: {
        text: string;
    }, _RendererRepository?: RendererRepository);
}
