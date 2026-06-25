import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import HistoryList from './components/HistoryList';
import PlayerSetup from './components/PlayerSetup';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [showSetup, setShowSetup] = useState(false);
  const [history, setHistory] = useState([]);
  
  const [players, setPlayers] = useState({
    X: { name: 'Player X', color: 'hsl(195, 100%, 50%)' },
    O: { name: 'Player O', color: 'hsl(325, 100%, 55%)' },
  });

  const [scores, setScores] = useState({
    X: 0,
    O: 0,
    Draws: 0,
  });

  // Apply light/dark theme class to HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const winnerInfo = calculateWinner(squares);
  const isDraw = !winnerInfo && !squares.includes(null);

  const handleSquareClick = (index) => {
    if (squares[index] || winnerInfo || isDraw) return;

    const nextSquares = squares.slice();
    const currentSymbol = xIsNext ? 'X' : 'O';
    nextSquares[index] = currentSymbol;
    setSquares(nextSquares);

    const result = calculateWinner(nextSquares);
    const full = !nextSquares.includes(null);

    if (result) {
      // Winner found
      setScores((prev) => ({ ...prev, [currentSymbol]: prev[currentSymbol] + 1 }));
      setHistory((prev) => [
        {
          id: Date.now(),
          outcome: currentSymbol,
          winnerName: players[currentSymbol].name,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        ...prev,
      ]);
    } else if (full) {
      // Draw found
      setScores((prev) => ({ ...prev, Draws: prev.Draws + 1 }));
      setHistory((prev) => [
        {
          id: Date.now(),
          outcome: 'Draw',
          winnerName: 'Draw',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        ...prev,
      ]);
    }

    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    // Let the loser go first (or default to X if it was a draw)
    if (winnerInfo) {
      setXIsNext(winnerInfo.winner === 'O'); // Winner goes second
    } else {
      setXIsNext(true);
    }
  };

  const resetAll = () => {
    resetGame();
    setScores({ X: 0, O: 0, Draws: 0 });
    setHistory([]);
  };

  const handleSaveSetup = (newPlayers) => {
    setPlayers(newPlayers);
    setShowSetup(false);
  };

  // Helper to format custom player colors as CSS variables
  const getGlowColor = (hslColor) => {
    if (hslColor.startsWith('hsl(')) {
      return hslColor.replace('hsl(', 'hsla(').replace(')', ', 0.35)');
    }
    return hslColor;
  };

  const styleVariables = {
    '--color-x': players.X.color,
    '--color-x-glow': getGlowColor(players.X.color),
    '--color-o': players.O.color,
    '--color-o-glow': getGlowColor(players.O.color),
  };

  return (
    <div style={styleVariables} className="app-wrapper">
      {/* Header controls & Settings */}
      <button
        type="button"
        className="settings-toggle"
        onClick={() => setShowSetup(true)}
        title="Settings"
        aria-label="Game settings"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {/* Main Game Screen */}
      <main className="glass-panel">
        <h1 style={{ textAlign: 'center' }}>TIC-TAC-TOE</h1>
        <p className="subtitle" style={{ textAlign: 'center' }}>Retro Modern Duel</p>

        {/* Scoreboard */}
        <div className="score-board">
          <div className="score-card x-score">
            <span className="score-label">{players.X.name} (X)</span>
            <span className="score-value">{scores.X}</span>
          </div>
          <div className="score-card">
            <span className="score-label">Draws</span>
            <span className="score-value" style={{ color: 'var(--color-draw)' }}>{scores.Draws}</span>
          </div>
          <div className="score-card o-score">
            <span className="score-label">{players.O.name} (O)</span>
            <span className="score-value">{scores.O}</span>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="status-banner">
          {!winnerInfo && !isDraw ? (
            <div className={`turn-indicator ${xIsNext ? 'active-x' : 'active-o'}`}>
              <div className="turn-dot" />
              <span>{xIsNext ? players.X.name : players.O.name}'s Turn</span>
            </div>
          ) : (
            <div style={{ flex: 1 }} />
          )}

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
              onClick={resetGame}
            >
              Reset Board
            </button>
          </div>
        </div>

        {/* Game Result Banner overlaying board or shown when game is complete */}
        {(winnerInfo || isDraw) && (
          <div className="game-result-container">
            {winnerInfo ? (
              <h2 className={`result-title ${winnerInfo.winner === 'X' ? 'win-x' : 'win-o'}`}>
                {players[winnerInfo.winner].name} Wins!
              </h2>
            ) : (
              <h2 className="result-title draw">It's a Draw!</h2>
            )}
            <button type="button" className="btn btn-primary" onClick={resetGame}>
              Play Again
            </button>
          </div>
        )}

        {/* Game Board */}
        {!winnerInfo && !isDraw && (
          <Board
            squares={squares}
            onClick={handleSquareClick}
            winningLine={winnerInfo ? winnerInfo.line : null}
          />
        )}
        
        {/* Render static board when game finished so they can see the final state */}
        {(winnerInfo || isDraw) && (
          <Board
            squares={squares}
            onClick={() => {}}
            winningLine={winnerInfo ? winnerInfo.line : null}
          />
        )}

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button
            type="button"
            className="btn btn-danger"
            style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem' }}
            onClick={resetAll}
          >
            Reset All Stats
          </button>
        </div>
      </main>

      {/* Sidebar/Collapsible Match History */}
      <aside className="glass-panel">
        <HistoryList history={history} onClear={() => setHistory([])} />
      </aside>

      {/* Setup Modal */}
      {showSetup && (
        <PlayerSetup
          players={players}
          onSave={handleSaveSetup}
          onClose={() => setShowSetup(false)}
        />
      )}
    </div>
  );
}
