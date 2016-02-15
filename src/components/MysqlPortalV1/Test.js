import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { debug } from './util.js';
import Growl from './Growl.js';
import Confirm from './Confirm.js';

export default React.createClass({
  async testConfirm() {
    const r = await this.refs.confirm.run();
    debug('return ' + r);
    Growl('return ' + r);
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
        </ButtonGroup>
      </div>
    );
  },
});
