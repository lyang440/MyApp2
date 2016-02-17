import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import css from './MysqlPortalV1.less';
import { Nav, NavItem, Grid, Row, Col, Panel } from 'react-bootstrap';
import { debug, fetch, tr, notNull, space } from './Util.js';
import NodeList from './NodeList.js';
import ParamModification from './ParamModification.js';
import LeftPanel from './LeftPanel.js';
import Test from './Test.js';
import Task from './Task.js';
import Growl from './components/Growl.js';

require('bootstrap-material-design/dist/css/bootstrap-material-design.css');
require('bootstrap-material-design/dist/css/ripples.css');

const MysqlPortalV1 = React.createClass({
  getInitialState() {
    return { appInfo: {}, nodeInfo: {}, tabIndex: 0 };
  },

  async componentWillMount() {
    const appInfo = await fetch('/v1/app/info');
    this.setState({ appInfo });
    const nodeInfo = await fetch('/v1/node/info');
    this.setState({ nodeInfo });
    debug('load', appInfo, nodeInfo);
  },

  onSelect(tabIndex) {
    debug('tab', tabIndex);
    if (tabIndex === -1) {
      debug('refresh', tabIndex);
      $(document).trigger('GLOBAL_REFRESH');
      Growl.success('刷新成功');
      return;
    }

    this.setState({ tabIndex });
  },

  render() {
    debug('render');
    const { appInfo, tabIndex, nodeInfo } = this.state;

    const Tabs = {
      '节点 cubes': <div>{LeftPanel(appInfo)}<NodeList appInfo={appInfo} nodeInfo={nodeInfo}/></div>,
      '参数修改 edit': <ParamModification/>,
      '任务 tasks': <Task/>,
      '监控 tv': null,
      '操作日志 file-text': null,
      '备份 cloud-upload': null,
      '控制台 terminal': null,
      '刷新 refresh': null,
      Test: <Test/>,
    };

    const Navs = _.keys(Tabs).map((v, index) => {
      if (v === '刷新') {
        return <NavItem key={index} eventKey={-1}><i className="fa fa-refresh"></i>{v}</NavItem>;
      }
      const [name, icon] = v.split(' ');
      debug(name, icon);
      return <NavItem key={index} eventKey={index}><i className={"fa fa-fw fa-"+icon}></i>{name}</NavItem>;
    });

    return (
      <div className={css.root}>
        <Grid>
          <Row>
            <Col xs={12}>
              <Nav bsStyle="tabs"
                   activeKey={tabIndex}
                   onSelect={this.onSelect}
              >
                {Navs}
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
});

export default MysqlPortalV1;
