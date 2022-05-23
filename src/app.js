import React from 'react';
import Square from './components/square';
import Count from './components/count';
import { calculateWinner } from './components/winners';
import './index.css';

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={'square ' + i}
        ifWinner={this.props.winnerArray.includes(i) }
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className='mr-8'>
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
      isDescending: true
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  sortHistory() {
    this.setState({
      isDescending: !this.state.isDescending
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      // instead of push use concat() or create new obj
      // this method will re-render the dom
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
        'Go to start';
      return (
        <li key={move}>
          <button
            size="sm"
            variant="warning"
            className="my-1 bg-white hover:bg-gray-200 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    let winnerValues;

    if (winner) {
      status = 'Winner: ' + winner.squares;
      winnerValues = winner.win;
    } else if (this.state.xIsNext === false && this.state.stepNumber === 9) {
      status = 'Draw';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className='mx-auto md:mx-0 border bg-white rounded border-4 border-blue-gray w-fit p-3'>
          <h1 className='font-header text-2xl'>{status}</h1>
        </div>
        <div className="max-w-md mx-auto overflow-hidden md:max-w-2xl">
          <div className="md:flex ml-8 md:ml-0">
            <div className="md:shrink-0">
              <div className='m-8 portrait:hidden tablet:hidden'>
                <Count
                  squares={current.squares}
                />
              </div>
            </div>
            <div className='m-8 portrait:m-14'>
              <Board
                winnerArray={winnerValues ? winnerValues : []}
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
              />
            </div>
            <div className='mt-8 portrait:m-6'>
              <ol>{this.state.isDescending ? moves : moves.reverse()}</ol>
              <button
                className="ml-7 my-1 bg-white hover:bg-gray-200 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
                onClick={() => this.sortHistory()}>
                {this.state.isDescending ? "Descending" : "Asending"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
