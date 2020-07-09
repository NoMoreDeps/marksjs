# This is an <h1> tag
## This is an <h2> tag
###### This is an <h6> tag

1. dfs**sdf**
1. sdfsdf
1 sdf__s**d**__f

* sdfsdf

- sdfsdf **sfsdfsdf**
- asdasd

- [ ] asdassda
- [x] asdasd


|col1|col2|
|----|----|
|val1|**val2**|

hdggd
===

```asd
asdasdsad


asdasd
sad

```

> blockquotes
> blockquotes
>   blockquotes

[img](ldkjdj)

[table format:csv]{{

}}

[code nested:true]{{
|sdfsdf|sdfsdfsdf|
| @@1@@ | sdfsdsdf |
}}

[table ref:1]{{
  aasd
}}




  <div style="display:none;position:fixed;top:0px;bottom:0px;left:0px;right:0px;flex-direction: row;">
    <textarea id="test" style="flex: 1;height: 100%; min-width: 50%;">

      ```
      To define a Header, you can use the # at the begining of a line, from 1 to 6
      #### This is a h4 header
      ##### This is a h5 header
      ###### This is a h6 header
      ```
      #### This is a h4 header
      ##### This is a h5 header
      ###### This is a h6 header
      
      ```
      Alternatively, you can set the = character bellow a text line too
      This a is another h4 header
      ====
      ```
      This a is another h4 header
      ====
      
      ```
      To use emphasis, you can do the following around any text:
      ** or __ for Italic
      * or _ for bold
      ```
      This is an **Italic text**.  
      This is a *Bold text*.  
      You can mix **_both_** if you want.  
      
      This is a variant danger text ::-variant:danger
      
      This is a variant danger text ::-variant:secondary classes:alert,alert-danger
      
      ```
      To define a blockquote juste start each consecutive line with the > char
      > This is a sigle line blockquote
      ```
      > This is a single line blockquote
      
      ```
      You can define inline Quote by placing ` char around text
      This is a sample of `inline code` inside a text
      ```
      This is a sample of `inline code` inside a text
      
      
      ```
      To define an image use ![ALT](LINK TITLE)
      ```
      ![allo](https://lh3.googleusercontent.com/ogw/ADGmqu-044H6d-MJZedy-JTdyjnimsYJbqe38bUl5R1S=s48-c-mo "Title")
      
      ```
      Or use a img block that can be configure via json description
      [img] {{
        "alt"   : "",
        "title" : "",
        "src"   : ""
      }}
      ```
      [img variant:rounded ref:IMG_01] {{
        "alt"   : "allo",
        "src"   : "https://lh3.googleusercontent.com/ogw/ADGmqu-044H6d-MJZedy-JTdyjnimsYJbqe38bUl5R1S=s48-c-mo",
        "title" : "Title"
      }}
      
      | Tables        | Are           | Cool  | ::-variant:striped,bordered width:600px
      | ------------- |:-------------:| -----:|
      | col 3 is      | right-aligned | $1600 |
      | col 2 is      | *centered*      |   $12 |
      | zebra stripes | are neat      |    $1 |
      
      [table format:markdown emp ref:ref1 nested] {{
        | Tables        | Are           | Cool  |
        | ------------- |:-------------:| -----:|
        | col 3 is      | right-aligned | $1600 |
        | col 2 is      | *centered*      |   $12 |
        | zebra stripes | are neat      |    @@IMG_01@@ |
      }}
      
      [table format:csv separator:; align_col2:center align_col3:right emp nested] {{
        CVS tables;are;cool
        col 3 is;*right-aligned*;$1600
        col 2 is;centered;$12
        zebra stripes;are neat;@@ref1@@
      }}
            
          
    </textarea>

    <div id="app" style="flex: 1;min-width: 50%;overflow: auto;"></div>
  </div>