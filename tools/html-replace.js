import fs from 'fs';
import Promise from 'bluebird';
import assert from 'assert';

const glob = Promise.promisify(require('glob'));

async function replace() {
  const files = await glob('./build/public/main*.js');
  assert.equal(files.length, 1);
  const html = fs.readFileSync('./src/public/index.html', 'utf8');
  const file = files[0];
  const fileNew = /main.*/.exec(file)[0];
  const htmlNew = html.replace('main.js', fileNew);
  fs.writeFileSync('./build/public/index.html', htmlNew);
}

export default replace;
