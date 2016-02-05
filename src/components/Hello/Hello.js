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
})

class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {cnt: 0};
  }

  tick = ()=> {
    this.setState({cnt: this.state.cnt + 1});
  };

  componentDidMount() {
    var self = this;
    const run = async ()=> {
      for (var i = 0; i < 100; i++) {
        await   sleep(100);
        this.tick()
      }
    };
    run()
  }

  render() {
    return (
      <h1>cntaa:{this.state.cnt}</h1>
    );
  }

}

export default withStyles(Hello, s);
