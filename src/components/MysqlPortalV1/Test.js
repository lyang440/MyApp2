import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { debug, sleep, notNull } from './Util.js';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import css from './Test.less';
import jade from './Test.jade';

import Growl from './components/Growl.js';
import Confirm from './components/Confirm.js';
import NProgress from './components/Nprogress.js';
import Alert from './components/Alert.js';
import Echarts from './components/Echarts.js';


const Test = React.createClass({
  getInitialState() {
    return {alert: false};
  },

  async testConfirm() {
    const r = await this.refs.confirm.run();
    debug('return ' + r);
    Growl('return ' + r);
  },

  async testNprogress() {
    NProgress.start();
    await sleep(1000);
    NProgress.done();
  },

  async testAlert() {
    debug('testAlert');
    this.setState({alert: !this.state.alert});
  },

  testGrowl() {
    Growl('default');
    Growl.success('success');
    Growl.info('info');
    Growl.warning('warning');
    Growl.danger('danger');
  },
  async testEcharts() {
    debug('testEcharts');
    const option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 250, 36, 10, 10, 20]
      }]
    };
    const e = <Echarts style={{width:600,height:600}} option={option}/>;
    this.refs.confirm.run({body: e});
  },
  render() {
    const test = jade.test4({css});

    return (
      <div>
        <Alert show={this.state.alert}
               title="alert" body="body"
               onClose={() => Growl('onClose') + this.testAlert()}
               onSave={() => Growl('onSave') + this.testAlert()}
        />
        <Confirm ref="confirm"></Confirm>
        <ButtonGroup>
          <Button onClick={this.testGrowl}>
            Test Growl
          </Button>
          <Button onClick={this.testConfirm}>
            Test Confirm
          </Button>
          <Button onClick={this.testNprogress}>
            Test Nprogress
          </Button>
          <Button onClick={this.testAlert}>
            Test Alert
          </Button>
          <Button onClick={this.testEcharts}>
            Show Echarts
          </Button>
        </ButtonGroup>

        <div>

        </div>
      </div>
    );
  },
});

export default withStyles(Test, css);
