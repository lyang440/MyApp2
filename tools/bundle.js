import webpack from 'webpack';
import webpackConfig from './webpack.config';
import child_process from 'child_process';
/**
 * Creates application bundles from the source files.
 */
function bundle() {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        return reject(err);
      }

      console.log(stats.toString(webpackConfig[0].stats));
      child_process.execSync('cd ./build/public && gzip --keep -9  `ls main* vendor*`')
      resolve();
    });
  });
}

export default bundle;
