import React, { Component } from 'react';
var con = [];
var numRows = 20;
var numCols = 20;
var de_x = [-1, +1, 0, 0];
var de_y = [0, 0, -1, +1];

function getNext(node, de) {
  var x = Math.floor(node / numRows) + de_x[de];
  var y = node % numRows + de_y[de];
  if (x >= numRows) x = 0;
  if (y >= numCols) y = 0;
  if (x < 0) x = numRows - 1;
  if (y < 0) y = numCols - 1;
  return x * 10 + y;
}
const Main = React.createClass({
  getInitialState(){
    var start = 0;
    con[start] = 'S';
    return {score: 1, start: start, snake: [start], de: 3, gameOver: false};
  },
  componentDidMount(){
    this.refs.body.focus();
    if (!this.state.gameOver) {
      this.goNext();
    } else {
      alert("gameOver");
    }
  },
  goNext(){
    setTimeout(()=> {
      var snake_1 = this.state.snake;
      var de_1 = this.state.de;
      var next = getNext(snake_1[0], de_1);
      con[snake_1[0]] = "";
      if (con[next] === 'S') {
        this.setState({gameOver: true});
        return;
      }
      con[next] = 'S';
      for (var i = snake_1.length - 2; i > 0; i++) {
        snake_1[i] = snake_1[i + 1];
      }
      snake_1[0] = next;
      this.setState({
        snake: snake_1
      });
    }, 1000);
    if (!this.state.gameOver) {
      setTimeout(this.goNext, 100);
    } else {
      alert("gameOver");
    }

  },
  keyDown(){
    console.log("aaa")
  },

  render(){
    var cells = [];
    var id = 0;
    for (var row = 0; row < numRows; row++) {
      for (var col = 0; col < numCols; col++) {
        if (con[row * numRows + col] === 'S') {
          cells.push(<div key={id} className="snake_cell cell" id={"c"+row*10+col}></div>);
        } else if (con[row * numRows + col] === 'F') {
          cells.push(<div key={id} className="food_cell cell" id={"c"+row*10+col}></div>);
        } else {
          cells.push(<div key={id} className="cell" id={"c"+row*10+col}></div>);
        }
        id++;
      }
    }
    return (
      <div className="snake_game" >
        <header>length : {this.state.score}</header>
        <div ref="body" className="game_body"  tabIndex="0" onKeyDown={this.keyDown}>
          {cells}
        </div>
      </div>
    );
  }

});
export default Main;
