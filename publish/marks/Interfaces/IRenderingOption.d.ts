export declare type TRenderingOption = {
    name?: string;
    theme?: string;
    variant?: string;
    classes?: string;
    nested?: "true" | "false";
    emp?: "true" | "false";
    ref?: string;
    xss?: "true" | "false";
    [key: string]: string | undefined;
};
