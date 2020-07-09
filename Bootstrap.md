
Bootstrap 4.5 Marks Theme
===

> Ceci est un **Blocquote**
> > nested is *good*  And here is a link : [My link](http://google.com)  
> > ~Oh yeah~ and here is an image ![My image](https://lh3.googleusercontent.com/ogw/ADGmqu-044H6d-MJZedy-JTdyjnimsYJbqe38bUl5R1S=s48-c-mo "ddddd")  
> `Ouaich`

Task list
- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported ::- noBullet
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item

___::- variant:dashed

* Item 1
* Item 2
  * Item 2a
  * Item 2b

1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
     1. Item *3a-1*
   1. Item 3b
     

This is a demonstration of what you can accomplish with *Marks* ***~~~language~~~*** when bootstrap theme is applied.

Headings
====

You can use the normal markdown anotation style to create heading from H1 to H6  
Just put the correct number of # character at the begening of the line

```
# H1 heading
## H2 heading
### H3 heading
#### H4 heading
##### H5 heading
###### H6 heading
```
# H1 heading
## H2 heading
### H3 heading
#### H4 heading
##### H5 heading
###### H6 heading

The same can be done using = the line below

```
H1 heading
=
H2 heading
==
H3 heading
===
H4 heading
====
H5 heading
=====
H6 heading
======
```

H1 heading
=
H2 heading
==
H3 heading
===
H4 heading
====
H5 heading
=====
H6 heading
======

<hr/>

Colors
====

In classic markdown, you cannot add custom style, so even when applying a bootstrap css file to a markdown doccument 
you will be able only to use a subset of what can be offered. For that reason *Marks* adds some `options` that can be defined to use 
themes in a more efficient way.

Bootstrap lets you define some text-colors. You can add options at the end of a line y adding `::-` followed by options  
In this case, we will use the variant to define the text color
```
Primary text `::- variant:primary`
You can set variant with the followin values : primary / secondary / success / danger / warning / info
```
Primary text ::- variant:primary

Secondary text ::- variant:secondary

Success text ::- variant:success

Success text ::- variant:danger

Success text ::- variant:warning

Success text ::- variant:info

It is quite the same to use the background color
```
Primary text `::- variant:bgPrimary`
You can set variant with the followin values : bgPrimary / bgSecondary / bgSuccess / bgDanger / bgWarning / bgInfo
```
Primary text ::- variant:bgPrimary

Secondary text ::- variant:bgSecondary

Success text ::- variant:bgSuccess

Success text ::- variant:bgDanger

Success text ::- variant:bgWarning

Success text ::- variant:bgInfo

<hr style="border-style: dashed;"/>

Tables
====

##### The MD style 

In order to use *Tables*, you have 2 `Options`. the first one is to use a normal markdown syntax.  
To proceed, you need to start every lines with the `|` character.  
The first line will define headers. The second one the columns and alignment, amd the others are rows.  
*Emphasis* can be used inside cells too.

```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | are neat      |    $1 |
```

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | are neat      |    $1 |

<hr style="border-style: dashed;"/>

##### Adding options 

Ok, it is great to have bootstrap table style by default. But it could be better if we can set some options too.  
Let's try with the with. Add `width:600px`  
We have to add options in the very first line of the Table definition.

```
| Tables        | Are           | Cool  | ::- width:600px
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | are neat      |    $1 |
```
| Tables        | Are           | Cool  | ::- width:600px
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | are neat      |    $1 |

<hr style="border-style: dashed;"/>

##### Adding variant
Now we can, as for text, use variant for tables too. Bootstrap allows the use of `Striped`, `Bordered`.

###### Striped
```
| Tables        | Are           | Cool  | ::-width:600px variant:striped
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | are neat      |    $1 |
```
| Tables        | Are           | Cool  | ::- width:600px variant:striped
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | are neat      |    $1 |

<hr style="border-style: dashed;"/>

###### Bordered
```
| Tables        | Are           | Cool  | ::- width:600px variant:bordered
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | are neat      |    $1 |
```
| Tables        | Are           | Cool  | ::- width:600px variant:bordered
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | are neat      |    $1 |

<hr style="border-style: dashed;"/>

##### Combine several options

Bootstrap allows variant to be combined. So for example, you can set `striped`, `bordered` and `small` at the same time.

###### Combine bordered,striped and small
```
| Tables        | Are           | Cool  | ::- width:600px variant:bordered,striped,small
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | are neat      |    $1 |
```
| Tables        | Are           | Cool  | ::- width:600px variant:bordered,striped,small
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | are neat      |    $1 |

<hr style="border-style: dashed;"/>

#### Theming

Bootstrap allows for some components to use an alternative theme. We can add the *dark theme* to teh table by setting teh theme in the options

##### Using dark theme

```
| Tables        | Are           | Cool  | ::- width:600px variant:bordered,striped,small theme:dark
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | are neat      |    $1 |
```
| Tables        | Are           | Cool  | ::- width:600px variant:bordered,striped,small theme:dark
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | are neat      |    $1 |

<hr style="border-style: dashed;"/>

#### Advanced tables using the Table Block

*Marks* allows custom block to be added in a simple way, so you can extend the page the way you want.  
All kind of block are delimited with the exact same Syntax.  

```
[NAME OPTIONS] {{
  PAYLOAD
}}
```
The first NAME is the block name, it is mandatory, this will trigger the correct plugin.  
Several plugins can have the same name, if one add feature to another.  Options are defined the same way as before.  
The payload is free text. Each plugin can use it the way it fits the better.

In our example, we will use the TABLE block to do the exact same render.

```
[table format:markdown width:600px variant:bordered,striped,small theme:dark] {{
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | are neat      |    $1 |
}}
```
[table format:markdown width:600px variant:bordered,striped,small theme:dark] {{
  | Tables        | Are           | Cool  |
  | ------------- |:-------------:| -----:|
  | col 3 is      | right-aligned | $1600 |
  | col 2 is      | *centered*    |   $12 |
  | zebra stripes | are neat      |    $1 |
}}

<hr style="border-style: dashed;"/>

#### Using the CSV format

The point is that if we extends the component to have the same syntax as the original Mardown version, it is not very usefull :-)  
But if we think about what can be done, we can add several option to allows more than that.  

Here the Table block can handle Mardown, and CSV too.

```
[table format:csv width:600px variant:bordered,striped,small theme:dark] {{
  CVS tables;are;cool
  col 3 is;*right-aligned*;$1600
  col 2 is;centered;$12
  zebra stripes;are neat;$1
}}
```
[table format:csv width:600px variant:bordered,striped,small theme:dark] {{
  CVS tables;are;cool
  col 3 is;*right-aligned*;$1600
  col 2 is;centered;$12
  zebra stripes;are neat;$1
}}

<hr style="border-style: dashed;"/>

##### Specific options

If we use the csv format, other specific options will be available. So we can define the `separator`.

```
[table format:csv width:600px variant:bordered,striped,small separator:| theme:dark] {{
  CVS tables|are|cool
  col 3 is|*right-aligned*|$1600
  col 2 is|centered|$12
  zebra stripes|are neat|$1
}}
```
[table format:csv width:600px variant:bordered,striped,small separator:| theme:dark] {{
  CVS tables|are|cool
  col 3 is|*right-aligned*|$1600
  col 2 is|centered|$12
  zebra stripes|are neat|$1
}}

### Source code colorizer
When using the `code` block, you can specify a language to coloize the code

```none
To define code bloc you have to use ``` and place your code inside
|```css
| p {
|   background-color: #efefef;
| }
|```
```

 ```css
 p {
   background-color: #efefef;
 }
 ```   

 ```javascript
 // ```javascript
 function hello() {
   console.log("hello kitty");
 }
 ```