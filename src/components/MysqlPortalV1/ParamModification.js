import React from 'react';
import EditTd from './EditTd.js';
import {tr, space, debug} from './util.js';
import {OverlayTrigger, Tooltip, Button, ButtonToolbar} from 'react-bootstrap';
import Confirm from './Confirm.js';

const ParamModification = React.createClass({
  propTypes: {
    paramsInfo: React.PropTypes.object.isRequired,
    onSaveParams: React.PropTypes.func.isRequired,
  },
  async save() {
    const r = await this.refs.confirm.run({title:"保存参数",body:"确认保存?"});
    if(r){
      debug('save success');
    }else{
      debug('cancel save');
    }
  },
  render() {
    const {paramsInfo, onSaveParams} = this.props;
    const tooltip = msg=><Tooltip id={msg}>{tr(msg)}</Tooltip>;
    return (
      <div>
        <Confirm ref="confirm"></Confirm>
        <div className="row">
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
              paramsInfo ? paramsInfo.params.map((v, i)=> {
                return (
                  <tr key={i}>
                    <td>{v.ParameterName}</td>
                    <td>{v.ParameterValue}</td>
                    <EditTd text={v.runningParameterValue} onSave={v=>onSaveParams('autocommit2', v)}/>
                    <td>{tr(v.ForceRestart)}</td>
                    <OverlayTrigger placement="left" overlay={tooltip(v.CheckingCode)}>
                      <td>{space(2)}<i className="fa fa-info"/></td>
                    </OverlayTrigger>
                    <OverlayTrigger placement="left" overlay={tooltip(v.ParameterDescription)}>
                      <td>{space(2)}<i className="fa fa-info"/></td>
                    </OverlayTrigger>
                  </tr>
                );
              }) : null
            }
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-md-3 col-md-offset-9">
            <ButtonToolbar>
              <Button onClick={this.save} bsStyle="primary">保存</Button>
              <Button onClick={null} bsStyle="primary">撤销</Button>
            </ButtonToolbar>
          </div>
        </div>
      </div>

    );
  }
});

export default ParamModification;
