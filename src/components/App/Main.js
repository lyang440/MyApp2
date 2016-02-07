import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import AppPortalInfo from '../AppPortalInfo';
import AppPortalHead from '../AppPortalHead';

const Main = React.createClass({
  render() {
    return <div>
      <AppPortalHead/>
      <AppPortalInfo/>
      </div>;
  },
});

export default Main;
