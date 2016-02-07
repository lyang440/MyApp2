import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import Main from './Main';

const DOM = React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <Route name="user" path="/user/:userNoteId" component={Main}/>
          <Route name="day" path="/day/:day" component={Main}/>
          <Route name="department" path="/day/:day/dep/:depId" component={Main}/>
        </Route>
        <Route path="*" component={Main}/>
      </Router>
    );
  },
});

export default DOM;
