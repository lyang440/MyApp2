import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import { Nav, NavItem, Grid, Row, Col, Panel, ProgressBar } from 'react-bootstrap';
import { debug, fetch, tr, notNull, space } from './util';


export default React.createClass({
  getInitialState() {
    return {taskInfo: []};
  },

  async refresh (){
    debug('receive refresh');
    const taskInfo = await fetch('/v1/task/info');
    this.setState({ taskInfo: taskInfo.process });
    debug('load', taskInfo);
  },

  componentWillUnmount() {
    debug('Task componentWillUnmount');
    $(document).unbind('GLOBAL_REFRESH', this.refresh);
  },

  componentWillMount() {
    debug('Task componentWillMount');
    $(document).bind('GLOBAL_REFRESH', this.refresh);
    this.refresh();
  },

  render() {
    const {taskInfo} = this.state;
    const tasks = taskInfo.map((v, i)=> {
      return (
        <div key={i}>
          <ProgressBar  now={v.process} label="%(percent)s%"/>
        </div>
      );
    })
    return (
      <div>
        {tasks}
      </div>

    );
  },
});

