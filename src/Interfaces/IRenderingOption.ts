export type TRenderingOption = {
  name?      : string           ; // name in block
  theme?     : string           ; // theme to use
  variant?   : string           ; // variant to apply
  classes?   : string           ; // classes to apply
  nested?    : "true" | "false" ; // True if component have to render nested ref 
  emp?       : "true" | "false" ; // True if component should accept to render emphasis
  ref?       : string           ; // If the component should be nested, it will not be rendered in the main;
  xss?       : "true" | "false" ; // force xss check

  [key: string]: string | undefined;
}
