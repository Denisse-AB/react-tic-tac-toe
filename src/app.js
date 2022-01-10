// Add a toggle button that lets you sort the moves in either ascending or descending order.
// When someone wins, highlight the three squares that caused the win.
// When no one wins, display a message about the result being a draw.

import React from 'react';
import './index.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function Square(props) {
  return (
    <button
      className="square"
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

function Count(props) {
  return (
    // TODO: loop or map rows
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <Button
              variant="link"
              className='text-decoration-none'
            >#
            </Button>
          </th>
          <th> History</th>
        </tr>
      </thead>
      <tbody>
        <tr className='margin'>
          <td>0</td>
          <td>{props.squares[0]}</td>
        </tr>
        <tr>
          <td>1</td>
          <td>{props.squares[1]}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>{props.squares[2]}</td>
        </tr>
        <tr>
          <td>3</td>
          <td>{props.squares[3]}</td>
        </tr>
        <tr>
          <td>4</td>
          <td>{props.squares[4]}</td>
        </tr>
        <tr>
          <td>5</td>
          <td>{props.squares[5]}</td>
        </tr>
        <tr>
          <td>6</td>
          <td>{props.squares[6]}</td>
        </tr>
        <tr>
          <td>7</td>
          <td>{props.squares[7]}</td>
        </tr>
        <tr>
          <td>8</td>
          <td>{props.squares[8]}</td>
        </tr>
      </tbody>
    </Table>
  )
}

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
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {squares: squares[a], win: [a, b ,c]};
    }
  }
  return null;
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      // TODO: Conditional render, pass winner
      <div>
        {[0, 1, 2].map(i => {
          return (
            <div className="board-row" key={i}>
              {[0, 1, 2].map(r => {
                return this.renderSquare(3 * i + r)
              })}
            </div>
          );
        })}
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'; // Ternary op.
    this.setState({
      // instead of push use concat()
      // this method doesn’t mutate the original array
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <Button
            size="sm"
            variant="warning"
            className="my-1"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </Button>
        </li>
      );
    });

    let status;

    if (winner) {
      status = 'Winner: ' + winner.squares;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <h1 className="header mb-4">{status}</h1>
        <div className="game">
          <Count
            squares={current.squares}
          />
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            {/* <div className='status-text'>{status}</div> */}
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
