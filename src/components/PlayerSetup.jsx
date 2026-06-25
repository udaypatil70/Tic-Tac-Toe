import React, { useState } from 'react';

const PRESETS_X = [
  { name: 'Cyber Cyan', value: 'hsl(195, 100%, 50%)' },
  { name: 'Emerald', value: 'hsl(145, 100%, 45%)' },
  { name: 'Amber Gold', value: 'hsl(45, 100%, 50%)' },
];

const PRESETS_O = [
  { name: 'Neon Pink', value: 'hsl(325, 100%, 55%)' },
  { name: 'Purple Mist', value: 'hsl(275, 100%, 65%)' },
  { name: 'Sunset', value: 'hsl(15, 100%, 55%)' },
];

export default function PlayerSetup({ players, onSave, onClose }) {
  const [p1Name, setP1Name] = useState(players.X.name);
  const [p1Color, setP1Color] = useState(players.X.color);
  const [p2Name, setP2Name] = useState(players.O.name);
  const [p2Color, setP2Color] = useState(players.O.color);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      X: { name: p1Name.trim() || 'Player 1', color: p1Color },
      O: { name: p2Name.trim() || 'Player 2', color: p2Color },
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <h2 style={{ fontFamily: 'var(--font-mono)', marginBottom: '1.5rem', textAlign: 'center' }}>
          Battle Setup
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* Player X Setup */}
          <div className="settings-group">
            <label htmlFor="p1-name">Player 1 (X) Name</label>
            <input
              id="p1-name"
              type="text"
              className="custom-input"
              value={p1Name}
              onChange={(e) => setP1Name(e.target.value)}
              placeholder="Player 1"
              maxLength={15}
            />
            <div style={{ marginTop: '0.75rem' }}>
              <label>Theme Color</label>
              <div className="color-options">
                {PRESETS_X.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    className={`color-swatch ${p1Color === preset.value ? 'selected' : ''}`}
                    style={{ backgroundColor: preset.value, color: preset.value }}
                    onClick={() => setP1Color(preset.value)}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '1.5rem 0' }} />

          {/* Player O Setup */}
          <div className="settings-group">
            <label htmlFor="p2-name">Player 2 (O) Name</label>
            <input
              id="p2-name"
              type="text"
              className="custom-input"
              value={p2Name}
              onChange={(e) => setP2Name(e.target.value)}
              placeholder="Player 2"
              maxLength={15}
            />
            <div style={{ marginTop: '0.75rem' }}>
              <label>Theme Color</label>
              <div className="color-options">
                {PRESETS_O.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    className={`color-swatch ${p2Color === preset.value ? 'selected' : ''}`}
                    style={{ backgroundColor: preset.value, color: preset.value }}
                    onClick={() => setP2Color(preset.value)}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Save Setup
            </button>
            {onClose && (
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
