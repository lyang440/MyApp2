import React from 'react';
import {Panel} from 'react-bootstrap';

const LeftPanel = (appInfo)=>(
  <Panel header="基础属性">
    <table className="table">
      <tbody>
      <tr>
        <td>应用名称</td>
        <td>{appInfo.appUri}</td>
      </tr>
      <tr>
        <td>提供者</td>
        <td>官方</td>
      </tr>
      <tr>
        <td>版本</td>
        <td>{appInfo.specVer}</td>
      </tr>
      <tr>
        <td>状态</td>
        <td>正常</td>
      </tr>
      <tr>
        <td>描述</td>
        <td>无</td>
      </tr>
      <tr>
        <td>Mysql版本</td>
        <td>5.5</td>
      </tr>
      </tbody>
    </table>
  </Panel>
);
export default LeftPanel;
