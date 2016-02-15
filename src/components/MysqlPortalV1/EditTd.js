import React from 'react';
import { space,debug } from './util';

const EditTd = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    onSave: React.PropTypes.func.isRequired,
  },
  getInitialState() {
    return {editing: false, value: ''};
  },

  onClick() {
    this.setState({editing: true, value: this.props.text});
  },

  onBlur() {
    this.setState({editing: false});
    this.props.onSave(this.state.value);
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevState.editing === false && this.state.editing === true) {
      if (this.refs.input) {
        debug('setSelectionRange');
        const l = this.refs.input.value.length;
        this.refs.input.setSelectionRange(l, l);
        this.refs.input.focus();
      }
    }
  },

  render() {
    const { text } = this.props;
    const { editing, value } = this.state;
    if (editing) {
      return (
        <td className="edit"
            onBlur={this.onBlur}
        >
          <input

            className="form-control"
            ref="input"
            onChange={e => this.setState({ value: e.target.value })}
            value={value}
          />
        </td>
      );
    }

    return (
      <td className="edit"
          onClick={this.onClick}
      >
        {text}{space(1)}
        <i className="fa fa-edit"/>
      </td>
    );
  },
});

export default EditTd;
