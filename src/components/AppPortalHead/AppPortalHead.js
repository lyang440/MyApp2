import React from 'react';
import css from './AppPortalHead.scss';
import jade from './AppPortalHead.jade';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';

const AppPortalHead = React.createClass({
  render() {
    return <div className={css.root}> {jade.main({})} </div>;
  },
});

export default AppPortalHead;
