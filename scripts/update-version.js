var fs = require("fs");
var {rmDirSync, copySync, mkDirSync} = require("./tools");


function update() {
  // Setup output folder
  let json    = JSON.parse(fs.readFileSync("package.json")) ;
  let version = json.version.split(".")                     ;
  version[version.length - 1] = Number(version[version.length - 1]) + 1;
  json.version = version.join(".");
  fs.writeFileSync("package.json", JSON.stringify(json, null, 2) ,"utf8");
  console.log("done !");
}

update();