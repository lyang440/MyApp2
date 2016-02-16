import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { debug, sleep } from './Util.js';
import Growl from './components/Growl.js';
import Confirm from './components/Confirm.js';
import NProgress from './components/Nprogress.js';
import Alert from './components/Alert.js';

export default React.createClass({
  getInitialState() {
    return { alert: false };
  },

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

  async testAlert() {
    debug('testAlert');
    this.setState({ alert: !this.state.alert });
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
            Test Nprogress
          </Button>
          <Button onClick={this.testAlert}>
            Test Alert
          </Button>
        </ButtonGroup>
        <Alert show={this.state.alert}
               title="alert" body="body"
               onClose={() => Growl('onClose') + this.testAlert()}
               onSave={() => Growl('onSave') + this.testAlert()}
        />
      </div>
    );
  },
});
