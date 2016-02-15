import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const Alert = React.createClass({
  propTypes: {
    onClose: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired,
    body: React.PropTypes.object.isRequired,
  },
  render() {
    const {onClose, onSave, show, title, body} = this.props;
    return (
      <Modal show={show} onHide={onClose}>
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

export default Alert;
