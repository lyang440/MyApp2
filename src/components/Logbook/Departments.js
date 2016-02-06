import React from 'react';
import $ from 'jquery';
import { cssDisplay, moodImgSrc } from './Util';
import { API_HOST } from './Config';
import { propTypesUser, propTypeDepartment } from './Config';
import _ from 'lodash';
import marked from 'marked';

// Departments组件
const Departments = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },
  propTypes: {
    users: propTypesUser,
    department: propTypeDepartment,
    date: React.PropTypes.string.isRequired,
    depId: React.PropTypes.string.isRequired,
  },
  getInitialState() {
    return {
      noteToday: []
    };
  },

  componentWillMount() {
    $.get(API_HOST + "/posts?day=" + this.props.date, (date) => {
      if (!date.data) {
        date.data = [];
      }

      this.setState({
        noteToday: date.data
      });
    });
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.props.date) {
      $.get(API_HOST + "/posts?day=" + nextProps.date, (date) => {
        if (!date.data) {
          date.data = [];
        }

        this.setState({
          noteToday: date.data
        });
      });
    }
  },

  setShowUsers(id) {
    if (id === parseInt(this.props.depId)) {
      id = -1;
      this.context.router.push("/day/" + this.props.date + "/dep/" + "-1");
    }

    this.context.router.push("/day/" + this.props.date + "/dep/" + id);
  },

  render() {
    const departmentNode = this.props.department.map((dep, id) => {
      const users = this.props.users.filter((user) => user.department === dep).map((user, id) => {
        let noteNode = _.find(this.state.noteToday, (note) => note.user_id === user.id);
        if (!noteNode) {
          noteNode = {
            mood: "",
            content: ""
          };
        }

        return {
          real_name: user.real_name,
          mood: noteNode.mood,
          content: noteNode.content
        };
      });

      return (
        <div key={id}>
          <li onClick={this.setShowUsers.bind(null, id)}>{dep}
            <div className="num">共{users.length}人</div>
          </li>
          <ul className="gs" style={cssDisplay(parseInt(this.props.depId) === id)}>
            {users.map((user, id) => (
        <li key={id}>
                <div className="name">姓名：{user.real_name}</div>
                <div className="mood">心情：<img src={moodImgSrc(user.mood)} alt=""/></div>
                <div className="note">日志：
                  <div className="noteCon"
          dangerouslySetInnerHTML={ {
            __html: marked(user.content)
          }}
          ></div>
                </div>
              </li>
        ))}
          </ul>
        </div>
        );
    });
    return (
      <ul className="departments">
        {departmentNode}
      </ul>
      );
  },
});
export default Departments;
