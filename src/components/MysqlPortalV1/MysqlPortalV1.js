import React from 'react';
import _ from 'lodash';
import css from './MysqlPortalV1.scss';
import jade from './MysqlPortalV1.jade';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, Nav, NavItem, Grid, Row, Col, Panel} from 'react-bootstrap';
import {debug, fetch, tr, notNull} from './util';


const MysqlPortalV1 = React.createClass({
    getInitialState() {
      return {appInfo: {}, tabIndex: 0};
    },

    async componentDidMount() {
      const appInfo = await fetch('http://l:5000/app/info');
      this.setState({appInfo});
    },

    render() {
      const {appInfo , tabIndex}= this.state;
      const tbody = _.map(appInfo.exports, (v, key) => ({...v, key})).map(v=> {
        const key = v.key.split('.').splice(-1);
        const hit = <span className="fa fa-circle text-success"></span>;
        return <tr key={v.key}>
          <td>{tr(key)}</td>
          <td>{v.key}.service.qiniu</td>
          <td>{v.address}</td>
          <td>{3306}</td>
          <td>{hit}正常</td>
        </tr>;
      });
      const Node = (
        <table className="table">
          <thead>
          <tr>
            <th>服务名称</th>
            <th>内网域名</th>
            <th>IP</th>
            <th>端口协议</th>
            <th>状态</th>
          </tr>
          </thead>
          <tbody>{tbody}</tbody>
        </table>
      );
      const Content = [Node, null, null, null];
      return (
        <div className={css.root} >
          <Grid>
            <Row>
              <Col xs={3}>
                <Panel header="基础属性">
                  <table className="table">
                    <tbody>
                    <tr>
                      <td>服务标示</td>
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
              </Col>
              <Col xs={9}>
                  <Nav bsStyle="tabs" activeKey={tabIndex} onSelect={index=>this.setState({ tabIndex:index })}>
                    {
                      ['节点', '监控', '操作日志', '备份', '任务'].map((v, index) => {
                        return <NavItem key={index} eventKey={index}>{v}</NavItem>;
                      })
                    }
                  </Nav>
                <Panel >
                  {notNull(Content[tabIndex])}
                </Panel>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    },
  })
  ;

export default withStyles(MysqlPortalV1, css);
