import React from 'react';
import css from './Hello.scss';
import jade from './Hello.jade';

const Hello = React.createClass({
  render() {
    return <div className={css.root}> {jade.main({})} </div>;
  },
});

export default Hello;
