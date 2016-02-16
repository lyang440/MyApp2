import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import MysqlPortalV1Test from '../MysqlPortalV1/Test.js';

const Main = React.createClass({
  render() {
    return (
      <MysqlPortalV1Test/>
    );
  },
});

export default Main;
