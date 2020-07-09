var fs       = require("fs");
var nodePath = require("path");

function mkDirSync(source) {
  var sourceTab = source.replace(/\\\\/g, "/").split("/");
  sourceTab.reduce( (previous, current) => {
    let path = `${previous}`;
    previous && (current = `${previous}/${current}`);
    !fs.existsSync(path) && fs.mkdirSync(path);
    path = `${current}`;
    !fs.existsSync(path) && fs.mkdirSync(path);
    return current;
  });

  if (sourceTab.length === 1) {
    !fs.existsSync(source) && fs.mkdirSync(source);
  }
}

function copySync(source, target) {
  let path  = `${source}` ;
  let files = []          ;
  let dirs  = []          ;

  // If source is not a folder but a file
  if (fs.lstatSync(`${source}`).isFile()) {
    mkDirSync(target);
    fs.copyFileSync(`${source}`, `${target}/${nodePath.basename(source)}`);
    return;
  }

  fs.existsSync(`${path}`) && fs.readdirSync(path).forEach( item => {
    if (fs.lstatSync(`${source}/${item}`).isFile()) {
      files.push(item);
    } else if (fs.lstatSync(`${source}/${item}`).isDirectory()) {
      dirs.push(item);
    }
  });
  
  files.forEach(file => {
    mkDirSync(target);
    fs.copyFileSync(`${source}/${file}`, `${target}/${file}`);
  });


  dirs.forEach( dir => {
    mkDirSync(`${target}/${dir}`);
    copySync(`${source}/${dir}`, `${target}/${dir}`);
  });
}

function rmDirSync(source) {
  let path  = `${source}` ;
  let files = []          ;
  let dirs  = []          ;

  fs.existsSync(`${source}`) && fs.readdirSync(path).forEach( item => {
    if (fs.lstatSync(`${source}/${item}`).isFile()) {
      files.push(item);
    } else if (fs.lstatSync(`${source}/${item}`).isDirectory()) {
      dirs.push(item);
    }
  });

  files.forEach( file => {
    fs.unlinkSync(`${source}/${file}`);
  });

  dirs.forEach( dir => {
    rmDirSync(`${source}/${dir}`);
  });

  fs.existsSync(`${source}`) && fs.rmdirSync(`${source}`);
}

module.exports = {
  mkDirSync ,
  copySync  , 
  rmDirSync
};
