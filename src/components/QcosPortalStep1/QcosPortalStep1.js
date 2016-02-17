import React from 'react';
import css from './QcosPortalStep1.scss';
import jade from './QcosPortalStep1.jade';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const content = (num, str) => str.repeat(num);

const QcosPortalStep1 = React.createClass({
  render() {
    return jade.main({ css, content });
  },
});

export default QcosPortalStep1;
