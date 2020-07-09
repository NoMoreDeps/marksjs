var {rmDirSync} = require("./tools");

function cleanAll() {
  rmDirSync("publish");
  rmDirSync("out");
  rmDirSync("coverage");
  rmDirSync("node_modules");
}

cleanAll();