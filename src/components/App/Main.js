import React from 'react';
import styles from './Main.scss';
import Content from './Content.jade';
import withStyles from 'isomorphic-style-loader/lib/withStyles';


const Main = React.createClass({
  render() {
    return <div className={styles.root} >
      <Content/>
          </div>;
  },
});

export default withStyles(Main, styles);
