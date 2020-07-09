var fs = require("fs");

fs.copyFileSync("publish/marks/dist/Marks.dist.js", "www/js/Marks.dist.js");
fs.copyFileSync("Plugins/Mermaid/publish/mermaid/dist/Marks.Mermaid.dist.js", "www/js/Marks.Mermaid.dist.js");
fs.copyFileSync("Plugins/Bootstrap/publish/bootstrap/dist/Marks.Bootstrap.dist.js", "www/js/Marks.Bootstrap.dist.js");