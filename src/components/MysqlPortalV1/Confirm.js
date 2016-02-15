import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {debug} from './util';

const Confirm = React.createClass({
  propTypes: {
    show: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired,
    body: React.PropTypes.object.isRequired,
  },
  getInitialState() {
    return {showModal: false};
  },
  async run() {
    return new Promise((resolve, reject) => {
      this.setState({showModal: true});
      this.resolve = resolve;
    });
  },
  onSave() {
    this.setState({showModal: false});
    this.resolve(true);
    delete this.resolve;
  },
  onClose() {
    this.setState({showModal: false});
    this.resolve(false);
    delete this.resolve;
  },
  render() {
    const {show, title, body} = this.props;
    const {onSave, onClose} = this;
    return (
      <Modal show={this.state.showModal} onHide={onClose}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {body}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={onSave} bsStyle="primary">Save changes</Button>
        </Modal.Footer>

      </Modal>
    );
  }
});

//const Test = React.createClass({
//  render() {
//    return (
//      <div>
//        <Confirm ref='confirm' title="确认保存" body="确认保存?"/>
//        <Button
//          bsStyle="primary"
//          bsSize="large"
//          onClick={ async ()=>{
//            debug('return', await this.refs.confirm.run({title:'aaa',body:'bbb'}))
//          }}
//        >
//          Launch demo modal
//        </Button>
//      </div>
//    )
//  }
//});
export default Confirm;
