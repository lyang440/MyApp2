import fs from 'fs';
import Promise from 'bluebird';
import assert from 'assert';

var glob = Promise.promisify(require("glob"));

async function replace() {
  let files = await glob("./build/public/main.*.js");
  assert.equal(files.length, 1);
  let data = fs.readFileSync('./src/public/index.html', 'utf8');
  let file = files[0];
  file = /main.*/.exec(file)[0];
  data = data.replace('main.js', file);
  fs.writeFileSync('./build/public/index.html', data);
}

export default replace;
