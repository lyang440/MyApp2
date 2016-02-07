import DOM from './components/App/';
import React from 'react';
import ReactDOM from 'react-dom';
import WithContext from "react-with-context"


let cssContainer = document.getElementById('css');
const appContainer = document.getElementById('app');

const context = {
  insertCss: styles => styles._insertCss(),
  onSetTitle: value => document.title = value,
  onSetMeta: (name, content) => {
    // Remove and create a new <meta /> tag in order to make it work
    // with bookmarks in Safari
    const elements = document.getElementsByTagName('meta');
    [].slice.call(elements).forEach((element) => {
      if (element.getAttribute('name') === name) {
        element.parentNode.removeChild(element);
      }
    });
    const meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    document.getElementsByTagName('head')[0].appendChild(meta);
  },
};

let Con = React.createClass({
  contextTypes: {
      insertCss: React.PropTypes.func.isRequired,
      onSetTitle: React.PropTypes.func.isRequired,
      onSetMeta: React.PropTypes.func.isRequired,
  },
  render(){
    return <WithContext context={context}>
          <DOM/>
        </WithContext>;
  }
})

window.React = React;
window.ReactDOM = ReactDOM;
ReactDOM.render(<Con/>, appContainer);


