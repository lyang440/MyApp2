import DOM from './components/App/';
import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import WithContext from "react-with-context"
window.React = React;
window._ = _;
window.$ = $;

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

React.render(<WithContext context={context}><DOM/></WithContext>, appContainer);




