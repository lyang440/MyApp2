import React from 'react';
import { tr } from './Util.js';
import _ from 'lodash';
import { Panel, ButtonToolbar, Button } from 'react-bootstrap';

const NodeList = React.createClass({
  propTypes: {
    appInfo: React.PropTypes.object.isRequired,
    nodeInfo: React.PropTypes.object.isRequired,
  },
  render() {
    const { appInfo, nodeInfo } = this.props;
    const hit = <span className="fa fa-cog fa-spin text-success"></span>;
    const tbody = _.map(appInfo.exports, (v, key) => ({...v, key})).map(v => {
      const key = v.key.split('.').splice(-1)[0];
      return (
        <tr key={v.key}>
          <td>{tr(key)}</td>
          <td>{v.key}.service.qiniu</td>
          <td>{v.address}</td>
          <td>{3306}</td>
          <td>{hit}正常</td>
        </tr>
      );
    });

    const tbody2 = _.map(nodeInfo, (v, key) => ({...v, key})).map(v => {
      const key = v.key;
      return (
        <tr key={v.key}>
          <td>{tr(key)}</td>
          <td>{v.key}.service.qiniu</td>
          <td>------</td>
          <td>{3306}</td>
          <td>{hit}{tr(v.status)}</td>
        </tr>
      );
    });
    const header = (
      <div>
        <span>节点信息</span>
      </div>
    );
    return (
      <Panel header={header}>

        <table className="table table-striped">
          <thead>
          <tr>
            <th>服务名称</th>
            <th>内网域名</th>
            <th>IP</th>
            <th>端口协议</th>
            <th>状态</th>
          </tr>
          </thead>
          <tbody>{tbody}{tbody2}</tbody>
        </table>
      </Panel>

    );
  },
});
export default NodeList;
