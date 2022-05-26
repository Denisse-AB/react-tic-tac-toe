import React from 'react';
import Square from './square';

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

export default Board;