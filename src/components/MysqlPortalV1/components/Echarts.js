import Echarts from 'echarts';
import React from 'react';


const EchartsTest = React.createClass({
  componentDidMount() {
    this.m = Echarts.init(this.refs.div);
    this.m.setOption(this.props.option);
  },
  componentDidUpdate() {
    this.m.setOption(this.props.option);
  },
  componentWillUnmount() {
    this.m.dispose();
  },
  render() {
    return <div style={this.props.style} ref="div"></div>
  }
});

export default EchartsTest;
