var {rmDirSync} = require("./tools");

function cleanAll() {
  rmDirSync("publish");
  rmDirSync("out");
  rmDirSync("dist");
  rmDirSync("coverage");
  rmDirSync("node_modules");
}

cleanAll();