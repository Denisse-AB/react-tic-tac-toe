import React from 'react';
import Board from './components/board';
import Count from './components/count';
import ScoreCard from './components/score-card';
import { calculateWinner } from './components/winners';
import { Helmet } from 'react-helmet';
import './index.css';


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
    let winnerMark;

    if (winner) {
      status = 'Winner: ' + winner.squares;
      winnerValues = winner.win;
      winnerMark = winner.squares;
    } else if (this.state.xIsNext === false && this.state.stepNumber === 9) {
      status = 'Draw';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Tic Tac Toe</title>
          <meta
            name="description"
            content="React tic tac toe tutorial"
          />
        </Helmet>
        <div className='mx-auto md:mx-0 border bg-white rounded border-4 border-blue-gray w-fit p-3'>
          <h1 className='font-header text-2xl'>{status}</h1>
        </div>
        <div className='flex mx-auto md:mx-0 border bg-white rounded border-4 border-blue-gray w-fit p-3 mt-3'>
          <ScoreCard
            winner={winner ? true : false}
            mark={winnerMark}
          />
        </div>
        <div className="max-w-md mx-auto overflow-hidden md:max-w-2xl">
          <div className="md:flex ml-8 md:ml-0 tablet:ml-[90px]">
            <div className="md:shrink-0">
              <div className='m-8 portrait:hidden tablet:hidden'>
                <Count
                  squares={current.squares}
                />
              </div>
            </div>
            <div className='m-8 portrait:m-14 md:portrait:ml-44'>
              <Board
                winnerArray={winnerValues ? winnerValues : []}
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
              />
            </div>
            <div className='mt-8 portrait:m-6 sm:portrait:ml-8 md:portrait:mt-12'>
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
