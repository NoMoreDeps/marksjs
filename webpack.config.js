var webpack = require('webpack') ;
var path    = require("path")    ;

module.exports = {
  entry  : './out/Index.js',
  output : {
    path          : path.resolve("./dist") ,
    filename      : 'Marks.dist.js'        ,
    libraryTarget : 'var'                  ,
    library       : 'Marks'
  }
};