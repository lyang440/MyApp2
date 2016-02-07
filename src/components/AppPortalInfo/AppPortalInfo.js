import React from 'react';
import css from './AppPortalInfo.scss';
import jade from './AppPortalInfo.jade';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';

const data = {
  "code": 200,
  "data": {
    "title": "standalone",
    "appUri": "wangkechun.standalone",
    "specUri": "qcos-vendor.mysql-standalone",
    "specVer": 1,
    "status": 2,
    "exports": {
      "standalone.base-portal-1": {
        "address": "172.16.7.16",
        "proto": 6
      },
      "standalone.mongo-express-1": {
        "address": "172.16.7.1",
        "proto": 6
      },
      "standalone.mongo-standalone-1": {
        "address": "172.16.7.7",
        "proto": 6
      },
      "standalone.mysql-standalone-1": {
        "address": "172.16.7.220",
        "proto": 6
      }
    },
    "parentUri": "",
    "vendorUri": ""
  }
};

const AppPortalInfo = React.createClass({
  render() {
    const json = this.props.json ? this.props.json : data.data;
    const Tbody = _.map(json.exports, (v, k) => (
        <tr key={k}>
          <td>{k}</td>
          <td>{k}.service.qiniu</td>
          <td>{v.address}</td>
          <td>{v.proto}</td>
        </tr>
      ));
    const tplName = _.last(json.specUri.split('.'));
    return <div className={css.root}> {jade.main({json, Tbody, tplName})} </div>;
  },
});

export default AppPortalInfo;
