import React from 'react';
import css from './CssLayoutLearn.scss';
import jade from './CssLayoutLearn.jade';

const CssLayoutLearn = React.createClass({
  render() {
    return jade.flex_3_column({ css });
  },
});

export default CssLayoutLearn;
