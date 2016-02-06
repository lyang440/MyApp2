import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
if (canUseDOM) {
  require('bootstrap-datepicker');
}

// 日历组件
const Calender = React.createClass({
  propTypes: {
    setDateNow: React.PropTypes.func.isRequired,
  },
  componentDidMount() {
    const $cal = $('<div class=\"date\"/>');
    $cal.datepicker({
      format: 'yyyy-mm-dd',
      todayHighlight: true,
    });
    $cal.on('changeDate', () => {
      const date = $cal.datepicker('getFormattedDate');
      this.props.setDateNow(date);
    });
    const node = ReactDOM.findDOMNode(this);
    $(node).append($cal);
  },

  render() {
    return (<div/>);
  },
});
export default Calender;
