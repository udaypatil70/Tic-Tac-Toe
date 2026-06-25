import React from 'react';

export default function HistoryList({ history, onClear }) {
  return (
    <div className="history-section">
      <div className="history-header">
        <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 600 }}>
          Match History
        </h3>
        {history.length > 0 && (
          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', borderRadius: '8px' }}
            onClick={onClear}
          >
            Clear Log
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="empty-history">No matches played yet in this session.</div>
      ) : (
        <div className="history-list">
          {history.map((match) => (
            <div key={match.id} className="history-item">
              <div>
                <span className="history-time">{match.time}</span>
                <div style={{ marginTop: '0.2rem', fontWeight: 500 }}>
                  {match.outcome === 'Draw' ? (
                    <span className="history-outcome draw">Draw</span>
                  ) : (
                    <span>
                      Winner:{' '}
                      <span className={`history-outcome ${match.outcome === 'X' ? 'win-x' : 'win-o'}`}>
                        {match.winnerName} ({match.outcome})
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
