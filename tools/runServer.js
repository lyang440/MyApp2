import cp from 'child_process';
import _ from 'lodash';

let server;

// Launch or restart the Node.js server
function runServer(cb) {
  if (_.isFunction(cb)) {
    cb(null, null);
  }

  if (server) {
    server.kill('SIGTERM');
  }

  server = cp.spawn('sh', [`${__dirname}/run-server.sh`], {
    env: Object.assign({ NODE_ENV: 'development' }, process.env),
    silent: false,
  });

  server.stderr.on('data', x => process.stderr.write(x));
}

process.on('exit', () => {
  if (server) {
    server.kill('SIGTERM');
  }
});

export default runServer;
