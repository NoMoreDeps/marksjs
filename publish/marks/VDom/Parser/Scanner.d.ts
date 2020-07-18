/**
 * Ported to Typescript from original source : https://github.com/creeperyang/html-parser-lite
 */
import * as Node from "./Node";
declare class HtmlScanner {
    rootNode: Node.DocumentNode;
    path: Node.DocumentNode[];
    constructor();
    reset(): void;
    getRootNode(): Node.DocumentNode;
    startElement(tagName: string, attrs: any, isSelfColse: boolean, input: string): any;
    endElement(tagName: string): void;
    characters(text: string): void;
    comment(text: string): void;
}
export { HtmlScanner };
