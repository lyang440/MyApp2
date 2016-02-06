import React from 'react';
import Caption from './Caption';
import Calender from './Calender';
//LeftArea组件
const LeftArea = React.createClass({
  render() {
    return (
      <div className="leftArea">
        <Calender {...this.props} />
        <Caption {...this.props} />
      </div>
      );
  }
});
export default LeftArea;
