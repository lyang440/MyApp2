import React from 'react';
import css from './AppPortalInfo.scss';
import jade from './AppPortalInfo.jade';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';

const data = require('data.json');

const AppPortalInfo = React.createClass({
  propTypes: {
    json: React.PropTypes.number,
  },
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
    return <div className={css.root}> {jade.main({ json, Tbody, tplName })} </div>;
  },
});

export default withStyles(AppPortalInfo, css);
