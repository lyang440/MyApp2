import React from 'react';
import styles from './Main.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const Main = React.createClass({
  render() {
    return <h1 className={styles.h} >hello world</h1>;
  },
});

export default withStyles(Main, styles);
