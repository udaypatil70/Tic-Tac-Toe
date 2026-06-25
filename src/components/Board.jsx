import React from 'react';
import Square from './Square';

export default function Board({ squares, onClick, winningLine }) {
  return (
    <div className="board-grid">
      {squares.map((square, index) => {
        const isWinningCell = winningLine && winningLine.includes(index);
        return (
          <Square
            key={index}
            value={square}
            onClick={() => onClick(index)}
            isWinningCell={isWinningCell}
          />
        );
      })}
    </div>
  );
}
