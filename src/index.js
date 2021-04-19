import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Fill an array of 9 with null
      squares: Array(9).fill(null),
      //Set turns
      xIsNext: true,
    };
  }
  handleClick(i) {
    //Make sure the square with a value cannot be replaced and there is no winner yet
    if (this.state.squares[i] !== null || calculateWinner(this.state.squares))
      return;
    //Create a shallow copy of the state's array
    const shallowSquares = [...this.state.squares];
    //Set the value to the index of the shallow copy
    shallowSquares[i] = this.state.xIsNext ? "X" : "O";
    //Set the state using the new value of square and change turn
    this.setState({ squares: shallowSquares, xIsNext: !this.state.xIsNext });
  }
  renderSquare(i) {
    /*Pass in a reference to the particular array index */
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    //If not null then there is a winner!
    if (winner) {
      status = `🏆🏆🏆 ${winner} is the winner!!! 🏆🏆🏆`;
    } else {
      //Switch players each turn
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

//Helper function to determine winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    //Add winning indices
    const [a, b, c] = lines[i];
    //Check if not null, then check if all squares have the same value
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
