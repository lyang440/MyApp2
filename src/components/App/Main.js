import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import AppPortalInfo from '../AppPortalInfo';
import AppPortalHead from '../AppPortalHead';
import Snake from '../Snake';
import Hello from '../Hello';
import Test from '../Test';
import CssLayoutLearn from '../CssLayoutLearn';
import QcosPortalStep1 from '../QcosPortalStep1';

const Main = React.createClass({
  render() {
    return (
      <QcosPortalStep1/>
    );
  },
});

export default Main;
