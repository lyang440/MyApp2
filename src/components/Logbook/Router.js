import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
import Main from './Main';


const DOM = React.createClass({
  render() {
    return <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <Route name="user" path="/user/:userNoteId" component={Main}/>
        <Route name="day" path="/day/:day" component={Main}>
        </Route>
        <Route name="department" path="/day/:day/dep/:depId" component={Main}/>
      </Route>
      <Route path="*" component={Main}/>
    </Router>
  }
});


// export default withStyles(DOM, s);
export default DOM;
