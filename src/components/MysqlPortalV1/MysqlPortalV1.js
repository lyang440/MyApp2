import React from 'react';
import _ from 'lodash';
import css from './MysqlPortalV1.scss';
import jade from './MysqlPortalV1.jade';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, Nav, NavItem, Grid, Row, Col, Panel, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {debug, fetch, tr, notNull, space} from './util';

//TODO：全局提醒

const EditTd = React.createClass({
  getInitialState() {
    return {editing:false, value:''};
  },
  onClick(event){
    this.setState({editing:true, value:this.props.text});
  },
  onBlur(event){
    this.setState({editing:false});
    this.props.onSave(this.state.value);
  },
  render() {
    const {text} = this.props;
    const {editing, value} = this.state;
    if(editing){
      return <td className="edit-td" onBlur={this.onBlur}><input autoFocus={true} className="form-control edit-td"
        onChange={e=>this.setState({value:e.target.value})} value={value}
        /></td>;
    }else{
      return <td className="edit-td" onClick={this.onClick}>{text}{space(1)}<i className="fa fa-edit"/></td>;
    }
  }
})

const MysqlPortalV1 = React.createClass({
    getInitialState() {
      return {appInfo: {}, nodeInfo:{}, tabIndex: 0};
    },

    async componentDidMount() {
      const appInfo = await fetch('/v1/app/info');
      this.setState({appInfo});
      const nodeInfo = await fetch('/v1/node/info');
      this.setState({nodeInfo});
      const paramsInfo = await fetch('/v1/params/info');
      this.setState({paramsInfo});
      debug('load',appInfo,nodeInfo,paramsInfo);
    },
    onSaveParams(param, value){
      debug('onSaveParams', param, value);
    },
    render() {
      debug('render');
      const {appInfo , tabIndex, nodeInfo, paramsInfo}= this.state;
      const tbody = _.map(appInfo.exports, (v, key) => ({...v, key})).map(v=> {
        const key = v.key.split('.').splice(-1)[0];
        const hit = <span className="fa fa-circle text-success"></span>;
        return <tr key={v.key}>
          <td>{tr(key)}</td>
          <td>{v.key}.service.qiniu</td>
          <td>{v.address}</td>
          <td>{3306}</td>
          <td>{hit}正常</td>
        </tr>;
      });

      const tbody2 = _.map(nodeInfo, (v, key) => ({...v, key})).map(v=> {
        const key = v.key;
        const hit = <span className="fa fa-circle text-success"></span>;
        return <tr key={v.key}>
          <td>{tr(key)}</td>
          <td>{v.key}.service.qiniu</td>
          <td>------</td>
          <td>{3306}</td>
          <td>{hit}{tr(v.status)}</td>
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
          <tbody>{tbody}{tbody2}</tbody>
        </table>
      );

      const tooltip = msg=><Tooltip id={msg}>{tr(msg)}</Tooltip>;
      const text = 'The autocommit mode. If set to 1, all changes to a table take effect immediately. If set to 0, you must use COMMIT to accept a transaction or ROLLBACK to cancel it';

      const ParamModification = (
        <table className="table params-table">
          <thead>
            <tr>
              <th width="25%">参数名</th>
              <th>参数默认值</th>
              <th>运行参数值</th>
              <th>是否重启</th>
              <th>可修改参数值</th>
              <th>参数描述</th>
            </tr>
          </thead>
          <tbody>
            {
              paramsInfo?paramsInfo.params.map((v,i)=>{
                return (
                  <tr key={i}>
                    <td>{v.ParameterName}</td>
                    <td>{v.ParameterValue}</td>
                    <EditTd text={v.runningParameterValue} onSave={v=>this.onSaveParams('autocommit2', v)} />
                    <td>{tr(v.ForceRestart)}</td>
                    <OverlayTrigger placement="left" overlay={tooltip(v.CheckingCode)}>
                      <td>{space(2)}<i className="fa fa-info"/></td>
                    </OverlayTrigger>
                    <OverlayTrigger placement="left" overlay={tooltip(v.ParameterDescription)}>
                      <td>{space(2)}<i className="fa fa-info"/></td>
                    </OverlayTrigger>
                  </tr>
                  );
              }):null
            }
          </tbody>
        </table>
        );

      const Tabs = {
        '节点': Node,
        '监控': null,
        '参数修改': ParamModification,
        '操作日志': null,
        '备份': null,
        '任务': null
      };


      return (
        <div className={css.root}>
          <Grid>
            <Row>
              <Col xs={3}>
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
              </Col>
              <Col xs={9}>
                <Nav bsStyle="tabs" activeKey={tabIndex} onSelect={index=>this.setState({ tabIndex:index })}>
                  {
                    _.keys(Tabs).map((v, index) => {
                      return <NavItem key={index} eventKey={index}>{v}</NavItem>;
                    })
                  }
                </Nav>
                <Panel >
                  {notNull(_.values(Tabs)[tabIndex])}
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
