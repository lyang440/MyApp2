import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import css from './MysqlPortalV1.less';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Nav, NavItem, Grid, Row, Col, Panel } from 'react-bootstrap';
import { debug, fetch, tr, notNull, space } from './Util.js';
import NodeList from './NodeList.js';
import ParamModification from './ParamModification.js';
import LeftPanel from './LeftPanel.js';
import Test from './Test.js';
import Task from './Task.js';
import Growl from './components/Growl.js';

const MysqlPortalV1 = React.createClass({
  getInitialState() {
    return {appInfo: {}, nodeInfo: {}, tabIndex: 0};
  },

  async componentWillMount() {
    const appInfo = await fetch('/v1/app/info');
    this.setState({appInfo});
    const nodeInfo = await fetch('/v1/node/info');
    this.setState({nodeInfo});
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
      '节点': <NodeList appInfo={appInfo} nodeInfo={nodeInfo}/>,
      '监控': null,
      '参数修改': <ParamModification/>,
      '操作日志': null,
      '备份': null,
      '任务': <Task/>,
      'Test': <Test/>,
      '刷新': null,
    };

    const Navs = _.keys(Tabs).map((v, index) => {
      if (v === "刷新") {
        return <NavItem key={index} eventKey={-1} >{v}</NavItem>;
      }

      return <NavItem key={index} eventKey={index}>{v}</NavItem>;
    });

    return (
      <div className={css.root}>
        <Grid>
          <Row>
            <Col xs={3}>
              {LeftPanel(appInfo)}
            </Col>
            <Col xs={9}>
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

export default withStyles(MysqlPortalV1, css);
