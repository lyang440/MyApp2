import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import AppPortalInfo from '../AppPortalInfo';
import AppPortalHead from '../AppPortalHead';
import Snake from '../Snake';
import Hello from '../Hello';
import Test from '../Test';

const Main = React.createClass({
  render() {
    return (
      <div id="Main">
      <Test/>
      </div>
    );
  },
});

export default Main;
