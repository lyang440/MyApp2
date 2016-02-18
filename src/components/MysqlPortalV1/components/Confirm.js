import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const Confirm = React.createClass({
  getInitialState() {
    return {showModal: false, title: '确认?', body: '是否保存?'};
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

  async run(params) {
    return new Promise((resolve) => {
      if (params && params.title) {
        this.setState({title: params.title});
      }

      if (params && params.body) {
        this.setState({body: params.body});
      }

      this.setState({showModal: true});
      this.resolve = resolve;
    });
  },

  render() {
    const { showModal, title, body } = this.state;
    const { onSave, onClose } = this;
    return (
      <Modal show={showModal} onHide={onClose}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {body}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onClose} className="btn-raised">取消</Button>
          <Button onClick={onSave} bsStyle="primary" className="btn-raised">确认</Button>
        </Modal.Footer>

      </Modal>
    );
  },
});

export default Confirm;
