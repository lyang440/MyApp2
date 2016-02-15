import React from 'react';
import {Modal, Button, ButtonGroup} from 'react-bootstrap';
import {debug} from './util.js';
import Growl from './Growl.js';
import Confirm from './Confirm.js';

export default React.createClass({
  async testConfirm (){
    const r = await this.refs.confirm.run();
    debug('return '+r);
    Growl('return '+r);
  },
  render() {
    return (
      <div>
        <ButtonGroup>
          <Button onClick={
          ()=>{
            debug('ok');
            Growl('ok');
            Growl.warning('ok2');
            Growl.danger('ok3');
          }
        }>
            Test Growl
          </Button>
          <Confirm ref="confirm"></Confirm>
          <Button onClick={this.testConfirm}>
            Test Confirm
          </Button>
        </ButtonGroup>
      </div>
    )
  }
})
