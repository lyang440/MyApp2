import React from 'react';
import css from './CssLayoutLearn.scss';
import jade from './CssLayoutLearn.jade';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const CssLayoutLearn = React.createClass({
  render() {
    return jade.main({css});
  },
});

export default withStyles(CssLayoutLearn, css);
