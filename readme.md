Unleash the Power of a New kind of Markdown

<p align="center"><a href="https://github.com/NoMoreDeps/marksjs"><img src="https://marksjs.com/assets/banner.gif" /></a></p>

## { Marks }

**Marks** is a markup language and a renderer that aims to keep the simplicity of *Markdown*,  
and brings a world of possibilities by removing its limits...

Discover it on its official website ***[Marks Website](https://marksjs.com)***.

**Marks** is almost compatible with Markdown, but brings more flexibility using styles, and allows the creation of custom components in an universal and easy way.

![CI](https://github.com/NoMoreDeps/marksjs/workflows/CI/badge.svg)

### Installation
```sh
# With npm
npm i -S @marks-js/marks

# With yarn
yarn add @marks-js/marks
```
**Marks** comes with Typescript declaration files, so you don't need to install separated definition.

### Get started

#### Minimal setup
```typescript
// Import the minimal set of Objects
import { MarksRenderer, Plugins } from "@marks-js/marks";

// Create a new instance of Marks renderer
const marks = new MarksRenderer();

// Register the default plugins in order to make it work
marks.registerRenderers(
  ...Plugins().map(_ => new _()), 
);

const htmlNode = marks.render(` Marks code here `);
document.querySelector("#MoutingPoint").appendChild(htmlNode);

// Alternaticely, you can pass the node as a second parameter
marks.render(` Marks code here `, document.querySelector("#MoutingPoint"));
```

**Marks** is compatible with almost *Markdown* syntax, so what is `cool` in *Markdown*, is still 
available in **Marks**. But Marks allows you to add styles, so it is now possible to have a page written in **Marks** with css.

For full documentation please see it on ***[Marks website](https://marksjs.com)*** or ***[Marks documentation](https://marksjs.com/guide)***

Extra `plugins` and `themes` will be available soon.

To test it in live, go to the ***[Playground](https://marksjs.com/repl)***.

Marks website is *`In Progress`*, so keep an eye on it.
