import React from 'react';
import css from './Hello.scss';
import jade from './Hello.jade';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';

const Hello = React.createClass({
  render() {
    return <div className={css.root}> {jade.main({})} </div>;
  },
});

export default Hello;
