class Board {
  constructor(height, width) {
    this.board = [];
    this.width =width;
    this.height=height;
    for (let i = 0; i < height; i++) {
      let line = Array(width);
      for (let j = 0; j < width; j++) {
        line[j] = 0;
      }
      this.board.push(line);
    }
  }

  print() {
    for (let i = 0; i < this.height; i++) {
      console.log("#", i, this.board[i].join(' '));
    }
    console.log("---")
  }

  set(x,y,v){
    console.assert(0<=x && x<=this.height);
    console.assert(0<=y && y<=this.width);
    this.board[x][y]=v;
  }
}


let board = new Board(20, 10);
board.print();
board.set(19,9,1);
board.print();



