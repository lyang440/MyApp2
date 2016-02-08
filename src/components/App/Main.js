import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import AppPortalInfo from '../AppPortalInfo';
import AppPortalHead from '../AppPortalHead';
import Snake from '../Snake';

const Main = React.createClass({
  render() {
    return (
      <div>
      <Snake/>
      </div>
    );
  },
});

export default Main;
