import React from 'react';
import css from './Snake.scss';
import jade from './Snake.jade';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
var numRows = 20;
var numCols = 20;
var de_x = [9, -1, +1, 0, 0];
var de_y = [9, 0, 0, -1, +1];

const EMPTY = 0;
const FOOD = 1;
const SNAKE = 2;

const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;

function css_display(value) {
  if (value) {
    return {display: 'block'};
  } else {
    return {display: 'none'};
  }
}

const Main = React.createClass({
    getInitialState(){
      var nextDe = null;
      var start = 0;
      var con = Array(numRows*numCols).fill(EMPTY);
      con[start] = SNAKE;
      var food_start = this.getFoodStart(start);
      con[food_start] = FOOD;
      return {score: 1, snake: [start], de: 3, gameOver: false, con: con};
    },
    componentDidMount(){
      this.refs.body.focus();
      this.goNext();
    },
    getFoodStart(start){
      var food_start = Math.floor(Math.random() * 40);
      while (food_start == start) {
        food_start = Math.floor(Math.random() * 40);
      }
      return food_start;
    },
    getNext(node, de) {
      var x = Math.floor(node / numRows) + de_x[de];
      var y = node % numRows + de_y[de];
      if (x >= numRows) x = 0;
      if (y >= numCols) y = 0;
      if (x < 0) x = numRows - 1;
      if (y < 0) y = numCols - 1;
      return x * numRows + y;
    },
    goNext(){
      var snake_1 = this.state.snake;
      var con_1 = this.state.con;
      var de_1 = this.state.de;
      var next = this.getNext(snake_1[0], de_1);

      if (this.state.con[next] === SNAKE) {
        this.setState({gameOver: true});
        //alert("gameOver!");
        return;
      }
      if (con_1[next] == FOOD) {
        var food = next;
        while (con_1[food]) {
          food = Math.floor(Math.random() * 40);
        }
        con_1[food] = FOOD;
      } else {
        con_1[snake_1.pop()] = EMPTY;
      }
      //unshift()方法将把它的参数插入arrayObject的头部，并将已经存在的元素依次顺次的移到较高的下标处；
      snake_1.unshift(next);
      //con_1[snake_1.pop()] = null;
      // console.log(snake_1,next);
      con_1[next] = SNAKE;
      if (this.nextDe) {
        de_1 = this.nextDe;
        this.nextDe = null;
      }
      this.setState({snake: snake_1, con: con_1, de: de_1});
      setTimeout(this.goNext, 200);
    },
    keyDown(event)
    {
      console.log(event.nativeEvent, event.nativeEvent.keyIdentifier, event.nativeEvent.keyCode);
      var de = 0;
      var oldDe = this.state.de;
      var code = event.nativeEvent.keyCode;
      if (code == UP) {
        de = 1;
      } else if (code == DOWN) {
        de = 2;
      } else if (code == LEFT) {
        de = 3;
      } else if (code == RIGHT) {
        de = 4;
      }
      // 不允许蛇倒退
      if(_.indexOf([12,21,34,43],oldDe*10+de)==-1){
        this.nextDe = de;
      }
    },
    resume(){
      this.setState({gameOver: false});
      this.setState(this.getInitialState());
      this.goNext();
    },
    render()
    {
      var cells = [];
      var id = 0;
      for (var row = 0; row < numRows; row++) {
        for (var col = 0; col < numCols; col++) {
          if (this.state.con[row * numRows + col] === SNAKE) {
            cells.push(<div key={id} className="snake_cell cell" id={"c"+row*20+col}></div>);
          } else if (this.state.con[row * numRows + col] === FOOD) {
            cells.push(<div key={id} className="food_cell cell" id={"c"+row*20+col}></div>);
          } else {
            cells.push(<div key={id} className="cell" id={"c"+row*10+col}></div>);
          }
          id++;
        }
      }
      return (
        <div>
          <div className="snake_game">
            <header>length : {this.state.snake.length}</header>
            <div ref="body" className="game_body" tabIndex="0" onKeyDown={this.keyDown}>
              {cells}
            </div>
            <div className="game_over" style={css_display(this.state.gameOver)}>Game Over !</div>
            <button style={css_display(this.state.gameOver)} onClick={this.resume}>重置</button>
          </div>
                <pre>
                  {JSON.stringify(this.state, '  ')}
                </pre>
        </div>
      );
    }

  })
  ;


const Snake = React.createClass({
  render() {
    return <div className={css.root}><Main rows={20} cols={20} /></div>;
  },
});

export default withStyles(Snake, css);
