// SHEBANGでやるのは無理
// 参照: https://stackoverflow.com/questions/33126309/why-do-usr-bin-env-var-val-command-gets-into-an-infinite-loop
//#!/usr/bin/env FORCE_COLOR=true node
const marked = require('marked');
const fs = require('fs');
const TerminalRenderer = require('marked-terminal');

marked.setOptions({
  renderer: new TerminalRenderer()
});

const getStdin = require('get-stdin');

//オプション等には対応していない
if (process.argv.length === 2){
  getStdin().then(str => {
    console.log(marked(str));
  });
} else if (process.argv[2] === ""){
  getStdin().then(str => {
    console.log(marked(str));
  });
} else {
  const path = process.argv[2];
  if(fs.existsSync(path) && !fs.statSync(path).isDirectory()){
    console.log(marked(fs.readFileSync(path).toString()));
  } else {
    console.log("No such file.");
  }
}
