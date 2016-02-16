import fs from 'fs';
import Promise from 'bluebird';
import assert from 'assert';
import del from 'del';

const glob = Promise.promisify(require('glob'));

async function replace() {
  await del(['./build/public/vendor.js']);
  let html = fs.readFileSync('./src/public/index.html', 'utf8');
  let files = await glob('./build/public/main*.js');
  assert.equal(files.length, 1);
  let file = files[0];
  let fileNew = /main.*/.exec(file)[0];
  html = html.replace('main.js', fileNew);

  files = await glob('./build/public/vendor*.js');
  assert.equal(files.length, 1);
  file = files[0];
  fileNew = /vendor.*/.exec(file)[0];
  html = html.replace('vendor.js', fileNew);

  fs.writeFileSync('./build/public/index.html', html);
}

export default replace;
