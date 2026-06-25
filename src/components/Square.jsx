import React from 'react';

export default function Square({ value, onClick, isWinningCell }) {
  const renderSymbol = () => {
    if (value === 'X') {
      return (
        <svg className="symbol-svg symbol-x" viewBox="0 0 100 100" aria-hidden="true">
          <line className="svg-draw-path" x1="20" y1="20" x2="80" y2="80" />
          <line className="svg-draw-path-2" x1="80" y1="20" x2="20" y2="80" />
        </svg>
      );
    }
    if (value === 'O') {
      return (
        <svg className="symbol-svg symbol-o" viewBox="0 0 100 100" aria-hidden="true">
          <circle className="svg-draw-path" cx="50" cy="50" r="30" />
        </svg>
      );
    }
    return null;
  };

  return (
    <button
      type="button"
      className={`square ${isWinningCell ? 'winning-cell' : ''}`}
      onClick={onClick}
      aria-label={value ? `Square marked with ${value}` : 'Empty square'}
    >
      {renderSymbol()}
    </button>
  );
}
