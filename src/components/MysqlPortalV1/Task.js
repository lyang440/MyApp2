import React from 'react';
import _ from 'lodash';
import { Nav, NavItem, Grid, Row, Col, Panel } from 'react-bootstrap';
import { debug, fetch, tr, notNull, space } from './util';


export default React.createClass({
  getInitialState() {
    return { taskInfo:[] };
  },

  async componentWillMount() {
    const taskInfo = await fetch('/v1/task/info');
    this.setState({ taskInfo });
    debug('load', taskInfo);
  },

  render() {
    const taskInfo = this.state;
    return (
      <div>
        {JSON.stringify(taskInfo)}
      </div>

    );
  },
});

