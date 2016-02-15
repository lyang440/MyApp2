import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import { Nav, NavItem, Grid, Row, Col, Panel, ProgressBar } from 'react-bootstrap';
import { debug, fetch, tr, notNull, space } from './util';
import moment from 'moment';
moment.locale('zh-CN');


export default React.createClass({
  getInitialState() {
    return {taskInfo: []};
  },

  async refresh (){
    debug('receive refresh');
    const taskInfo = await fetch('/v1/task/info');
    this.setState({ taskInfo: taskInfo.process });
    debug('load', taskInfo);
  },

  componentWillUnmount() {
    debug('Task componentWillUnmount');
    $(document).unbind('GLOBAL_REFRESH', this.refresh);
  },

  componentWillMount() {
    debug('Task componentWillMount');
    $(document).bind('GLOBAL_REFRESH', this.refresh);
    this.refresh();
  },

  render() {
    const { taskInfo } = this.state;
    const tasks = taskInfo.map((v, i) => {
      return (
        <div key={i} className="Task">
          {/*<ProgressBar  now={v.process} label="%(percent)s%"/>*/}
        </div>
      );
    });
    return (
      <div>
        <table className="table task-table table-bordered">
            <thead>
            <tr>
              <th>任务类型</th>
              <th>描述</th>
              <th>状态</th>
              <th>进度</th>
              <th>启动时间</th>
              <th>已用时间</th>
            </tr>
            </thead>
            <tbody>
            {
              taskInfo.map((v, i) => {
                const className = {
                  'success':'',
                  'error':'danger',
                  'doing':'success'
                }[v.status];
                return (
                  <tr key={i} className={className}>
                    <td>{v.type}</td>
                    <td>{v.info}</td>
                    <td>{v.status}</td>
                    <td>{v.process}%</td>
                    <td>{moment.unix(v.create).toNow()}</td>
                    <td>{moment.duration(v.since,'second').humanize()}</td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
      </div>

    );
  },
});

