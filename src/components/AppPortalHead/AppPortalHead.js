import React from 'react';
import css from './AppPortalHead.scss';
import jade from './AppPortalHead.jade';

const AppPortalHead = React.createClass({
  render() {
    return <div className={css.root}> {jade.main({})} </div>;
  },
});

export default AppPortalHead;
