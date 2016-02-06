import React from 'react';
import { propTypesUser, propTypeDepartment } from './Config';
import { cssDisplay } from './Util';
import { Link } from 'react-router';

// 侧边的部门组件
const Caption = React.createClass({
  propTypes: {
    users: propTypesUser,
    department: propTypeDepartment,
  },
  getInitialState() {
    return {
      showUser: -1
    };
  },

  setShowUsers(id) {
    if (id === this.state.showUser)
      id = -1;
    this.setState({
      showUser: id
    });
  },

  render() {
    const departmentNode = this.props.department.map((dep, id) => {
      const users = this.props.users.filter((user) => user.department === dep);
      return (
        <div key={id}>
          <li onClick={this.setShowUsers.bind(null, id)}>{dep}({users.length})</li>
          <ul className="gd" style={cssDisplay(this.state.showUser === id)}>
            {
        users.map((user, id2) => <Link key={id2} to={"/user/" + user.id}>
                  <li>{user.real_name}</li>
                </Link>
        )
        }
          </ul>
        </div>
        );
    });
    return (
      <div className="caption">
        <ul className="c_de">
          {departmentNode}
        </ul>
      </div>
      );
  },
});
export default Caption;
