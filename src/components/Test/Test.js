import React from 'react';
import css from './Test.scss';
import jade from './Test.jade';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const Test = React.createClass({
  render() {
    return <div className={css.root}> {jade.main({})} </div>;
  },
});

export default withStyles(Test, css);
