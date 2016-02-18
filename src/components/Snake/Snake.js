import React from 'react';
import css from './Snake.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';

const ACTION_X = [9, -1, +1, 0, 0];
const ACTION_Y = [9, 0, 0, -1, +1];

const EMPTY = 0;
const FOOD = 1;
const SNAKE = 2;

const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;

const DEBUG = false;

function cssDisplay(value) {
  if (value) {
    return { display: 'block' };
  }

  return { display: 'none' };
}

const Snake = React.createClass({
  propTypes: {
    rows: React.PropTypes.number,
    cols: React.PropTypes.number,
    speed: React.PropTypes.number,
  },
  getDefaultProps() {
    return {
      rows: 20,
      cols: 20,
      speed: 200,
    };
  },

  getInitialState() {
    const snakeStart = 0;
    const board = new Array(this.props.rows * this.props.cols).fill(EMPTY);
    board[snakeStart] = SNAKE;
    const foodStart = this.getFoodStart();
    board[foodStart] = FOOD;
    return { snake: [snakeStart], action: 3, gameOver: false, board };
  },

  componentDidMount() {
    this.refs.body.focus();
    this.nextStep();
  },

  getFoodStart() {
    let foodStart = Math.floor(Math.random() * 40);
    while (foodStart === 0) {
      foodStart = Math.floor(Math.random() * 40);
    }

    return foodStart;
  },

  getFood() {
    let foodStart = Math.floor(Math.random() * 40);
    while (this.state.board[foodStart] !== EMPTY) {
      foodStart = Math.floor(Math.random() * 40);
    }

    return foodStart;
  },

  getNext(node, action) {
    let x = Math.floor(node / this.props.rows) + ACTION_X[action];
    let y = node % this.props.rows + ACTION_Y[action];
    if (x >= this.props.rows) x = 0;
    if (y >= this.props.cols) y = 0;
    if (x < 0) x = this.props.rows - 1;
    if (y < 0) y = this.props.cols - 1;
    return x * this.props.rows + y;
  },

  nextStep() {
    const _snake = this.state.snake;
    const _board = this.state.board;
    let _action = this.state.action;
    const next = this.getNext(_snake[0], _action);

    // 撞到自己
    if (this.state.board[next] === SNAKE) {
      this.setState({ gameOver: true });
      return;
    }

    // 找到食物
    if (_board[next] === FOOD) {
      _board[this.getFood()] = FOOD;
    } else {
      _board[_snake.pop()] = EMPTY;
    }

    // unshift()方法将把它的参数插入arrayObject的头部，并将已经存在的元素依次顺次的移到较高的下标处；
    _snake.unshift(next);

    // con_1[snake_1.pop()] = null;
    // console.log(snake_1,next);
    _board[next] = SNAKE;
    if (this.nextDe) {
      _action = this.nextDe;
      this.nextDe = null;
    }

    this.setState({ snake: _snake, board: _board, action: _action });
    setTimeout(this.nextStep, this.props.speed);
  },

  keyDown(event) {
    const code = event.nativeEvent.keyCode;
    let newAction = 0;
    const oldAction = this.state.action;

    if (code === UP) {
      newAction = 1;
    } else if (code === DOWN) {
      newAction = 2;
    } else if (code === LEFT) {
      newAction = 3;
    } else if (code === RIGHT) {
      newAction = 4;
    }

    // 不允许蛇倒退
    if (_.indexOf([12, 21, 34, 43], oldAction * 10 + newAction) === -1) {
      this.nextDe = newAction;
    }
  },

  resume() {
    this.setState({ gameOver: false });
    this.setState(this.getInitialState());
    this.nextStep();
  },

  render() {
    const cells = [];
    let id = 0;
    for (let row = 0; row < this.props.rows; row++) {
      for (let col = 0; col < this.props.cols; col++) {
        if (this.state.board[row * this.props.rows + col] === SNAKE) {
          cells.push(<div key={id} className="snake_cell cell" id={`c${row * 20 + col}`}></div>);
        } else if (this.state.board[row * this.props.rows + col] === FOOD) {
          cells.push(<div key={id} className="food_cell cell" id={ `c${row * 20 + col}` }></div>);
        } else {
          cells.push(<div key={id} className="cell" id={ `c${row * 10 + col}` }></div>);
        }

        id++;
      }
    }

    const debug = DEBUG ? (
      <pre>
          {JSON.stringify(this.state, '  ')}
          </pre>
    ) : null;

    return (
      <div className={css.root}>
        <div className="snake_game">
        <header>length : {this.state.snake.length}</header>
        <div ref="body" className="game_body" tabIndex="0" onKeyDown={this.keyDown}>
          {cells}
        </div>
        <div className="game_over" style={cssDisplay(this.state.gameOver)}>Game Over !</div>
        <button style={cssDisplay(this.state.gameOver)} onClick={this.resume}>重置</button>
        </div>
        {debug}
      </div>
    );
  },
});

export default withStyles(Snake, css);
