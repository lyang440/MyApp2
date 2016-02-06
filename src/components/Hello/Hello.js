import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Hello.scss';
import Link from '../Link';
import Navigation from '../Navigation';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';


const sleep = (ms)=>new Promise((resolve, reject)=> {
  setTimeout(()=> {
    resolve(null)
  }, ms)
});

class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {cnt: 0};
  }

  tick = () => {
    this.setState({cnt: this.state.cnt + 1});
  };

  keyDown = (event)=> {
    console.log(event);
    this.tick();
  };

  componentDidMount() {
    this.refs.h1.focus();
  }

  render() {
    return (
      <h1 ref="h1" tabIndex="0" onClick={this.keyDown} onKeyPress={this.keyDown} onKeyDown={this.keyDown}>
        cntaa:{this.state.cnt}</h1>
    );
  }

}


export default withStyles(Hello, s);
