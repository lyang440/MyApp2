import React from 'react';
import NoteBtn from './NoteBtn';
import Inf from './Inf';
//Header组件
const Header = React.createClass({
  render() {
    return (
      <header className="header">
        <div className="icon">
          <img src="/public/img/icon.png" alt=""/>
        </div>
        <div className="nav">
          <NoteBtn />
          <Inf />
        </div>
      </header>
    )
  }
});
export default Header;
