import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { debug, sleep } from './util.js';
import Growl from './Growl.js';
import Confirm from './Confirm.js';
import NProgress from './Nprogress.js';

export default React.createClass({
  async testConfirm() {
    const r = await this.refs.confirm.run();
    debug('return ' + r);
    Growl('return ' + r);
  },
  async testNprogress() {
    NProgress.start();
    await sleep(1000);
    NProgress.done();
  },
  render() {
    return (
      <div>
        <ButtonGroup>
          <Button onClick={
            () => {
              debug('ok');
              Growl('default');
              Growl.success('success');
              Growl.info('info');
              Growl.warning('warning');
              Growl.danger('danger');
            }
          }
          >
            Test Growl
          </Button>
          <Confirm ref="confirm"></Confirm>
          <Button onClick={this.testConfirm}>
            Test Confirm
          </Button>
          <Button onClick={this.testNprogress}>
            Test nprogress
          </Button>
        </ButtonGroup>
      </div>
    );
  },
});
