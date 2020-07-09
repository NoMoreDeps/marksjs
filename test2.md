#### Marks features
Marks is a markup language that aims to keep what is great with Markdown, but with 
simple addition that allows it to be extended in a very simpler way.

To be clear, Marks allow custom block with a unique declaration syntax, and adds the ability to use options with any line.
____ ::- variant:dashed

##### Feature comparaison

Here you will find a feature comparaison between Marks and Markdown

``` ::- ref:RMD
# Heading 1
## Heading 2
### Heading 3
```

``` ::- ref:RMK
# Heading 1
## Heading 2
### Heading 3
```

[marks ref:RRO]{{
# Heading 1
## Heading 2
### Heading 3
}}

##### Heading

To create a heading, add number signs (#) in front of a word or phrase. The number of number signs you use should correspond to the heading level, from 1 to 6

[table format:csv variant:bordered,headDark nested] {{
Markdown;Marks;Output
@@RMD@@ ; @@RMK@@ ; @@RRO@@
}}

``` ::- ref:RMD
Not supported
```

``` ::- ref:RMD2
Heading level 1
===============
Heading level 2
---------------
```

``` ::- ref:RMK
Heading 4
====
Heading 5
=====
Heading 6
======
```

[marks ref:RRO]{{
Heading 4
====
Heading 5
=====
Heading 6
======
}}

[marks ref:RRO]{{
Heading 4
====
Heading 5
=====
Heading 6
======
}}

##### Heading Alternate Syntax

Alternatively, on the line below the text, add any number of = from 1 to 6

[table format:csv variant:bordered,headDark nested] {{
Markdown;Marks;Output
@@RMD@@ ; @@RMK@@ ; @@RRO@@
@@RMD2@@ ; Not supported ; ---
}}

*Marks* keeps the same syntax as *Markdown* whenever ::- classes:bd-callout,bd-callout-info elt:div
it is possible. But you will see that you can do `more` than that.

``` ::- ref:RMD
I really like using Markdown.

I think I'll use it to format
all of my documents from now on.
```

``` ::- ref:RMK
I really like using Markdown.

I think I'll use it to format
all of my documents from now on.
```

[marks ref:RRO]{{
I really like using Markdown.

I think I'll use it to format 
all of my documents from now on.
}}

##### Paragraph

To create paragraphs, use a blank line to separate one or more lines of text.

[table format:csv variant:bordered,headDark nested] {{
Markdown;Marks;Output
@@RMD@@ ; @@RMK@@ ; @@RRO@@
}}

``` ::- ref:RMD
This is the first line.  
And this is the second line.
```

``` ::- ref:RMK
This is the first line.  
And this is the second line.
```

[marks ref:RRO]{{
This is the first line.   
And this is the second line.
}}

##### Line Breaks

To create a line break (&lt;br&gt;), end a line with two or more spaces, and then type return.

[table format:csv variant:bordered,headDark nested] {{
Markdown;Marks;Output
@@RMD@@ ; @@RMK@@ ; @@RRO@@
}}

##### Emphasis

You can provide some `Emphasis` to part of the text as describe in the following table.

[table format:csv variant:bordered,headDark separator:| emp] {{
type|Markdown|Marks|Output
`Bold`|\*Word\*|\*Word\*|*Word*
`Bold`|\_Word\_|\_Word\_|_Word_
`Italic`|\*\*Word\*\*|\*\*Word\*\*|**Word**
`Italic`|\_\_Word\_\_|\_\_Word\_\_|__Word__
`Strikethrough`|\~\~Word\~\~|\~\~Word\~\~|~~Word~~
`Underline`|---|\~Word\~|~Word~
`Combine`|\_\_\*Word\*\_\_|\_\_\*Word\*\_\_|__*Word*__
}}

##### Blockquote

To create a blockquote, add a `>` in front of each line that are included in the blockquote.

- [x] Markdown ::- noBullet
- [x] Marks

```
> This is a simple `Blockquote`
```

> This is a simple `Blockquote`

```
> This is a *Multiline* Blockquote
> With nested syntax **support**
> And it is so cool `:-)`
```

> This is a *Multiline* Blockquote  
> With nested syntax **support**  
> And it is so cool `:-)`

##### Nested Blockquote

Blockquotes can be nested. Add a `>>` in front of the line you want to nest.

- [x] Markdown ::- noBullet
- [x] Marks

```
> This is a simple `Blockquote`
>> With nested *one*
```

>This is a simple `Blockquote`
>> With nested *one*

er