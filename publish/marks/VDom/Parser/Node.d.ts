/**
 * Ported to Typescript from original source : https://github.com/creeperyang/html-parser-lite
 */
declare class Node {
    tagName: string;
    nodeType: number;
    textContent?: string;
    parentNode?: Node;
    attrs: any;
    childNodes: Array<Node>;
    className?: string;
    id?: string;
    constructor({ tagName, nodeType, attrs, textContent, parentNode, childNodes }: {
        tagName: string;
        nodeType: number;
        attrs?: any;
        textContent?: string;
        parentNode?: Node;
        childNodes?: Node[];
    });
    appendChild(node: Node): void;
    insertAfter(node: Node, targetNode: Node): void;
    insertBefore(node: Node, targetNode: Node): void;
    toJSON(): any;
}
export { Node };
export declare const NODE_TYPE: {
    ELEMENT_NODE: number;
    TEXT_NODE: number;
    COMMENT_NODE: number;
    DOCUMENT_NODE: number;
    DOCUMENT_TYPE_NODE: number;
};
declare class DoctypeNode extends Node {
    systemId: string;
    publicId: string;
    name: string;
    constructor(options: any);
    toJSON(): {
        tagName: string;
        nodeType: number;
        publicId: string;
        systemId: string;
        name: string;
    };
}
declare class DocumentNode extends Node {
    getElementById(id: string): null | undefined;
}
export { DoctypeNode };
export { DocumentNode };
