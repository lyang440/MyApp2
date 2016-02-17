import React from 'react';
import css from './Test.scss';
import jade from './Test.jade';

const Test = React.createClass({
  render() {
    return <div className={css.root}> {jade.main({})} </div>;
  },
});

export default Test;
