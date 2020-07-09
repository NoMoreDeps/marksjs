var fs = require("fs");
const {rmDirSync, copySync, mkDirSync} = require("./tools");
const { execSync } = require("child_process");


function prepareNpmPublish() {
  let json    = JSON.parse(fs.readFileSync("package.json")) ;
  const name  = json.name.split("/").pop();

  // Setup output folder
  console.log("Compiling ...");
  console.log(execSync("yarn tsc").toString());
  console.log("Packing ...");
  console.log(execSync("yarn webpack").toString());

  console.log("Preparing publish");
  try {
    rmDirSync("publish");
  } catch{}

  copySync("readme.md"  , `publish/${name}`)      ;
  copySync("out/"       , `publish/${name}`)      ;
  copySync("dist/"      , `publish/${name}/dist`) ;

  console.log("Cleaning temporary folders");
  rmDirSync("out");
  rmDirSync("dist");
  
  console.log("Updating version")
  let version = json.version.split(".")                     ;
  version[version.length - 1] = Number(version[version.length - 1]) + 1;
  json.version = version.join(".");

  fs.writeFileSync("package.json", JSON.stringify(json, null, 2) ,"utf8");

  if (!fs.existsSync(`publish/${name}/package.json`)) {
    fs.writeFileSync(`publish/${name}/package.json`, JSON.stringify(json, null, 2) ,"utf8");
    console.log("done !");
  } else {
    console.error("out / publish directory not found.")
  }
}

prepareNpmPublish();