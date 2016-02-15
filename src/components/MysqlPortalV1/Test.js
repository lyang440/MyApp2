import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {debug} from './util.js';
import Growl from './Growl.js';

export default React.createClass({
  render() {
    return (
      <div>
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
      </div>
    )
  }
})
