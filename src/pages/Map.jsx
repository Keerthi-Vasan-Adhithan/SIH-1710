import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import translations from '../i18n';

const facilities = [
  { name: 'Restroom', top: 80, left: 300 },
  { name: 'Platform 1', top: 100, left: 150 },
  { name: 'Food Court', top: 200, left: 400 },
  { name: 'Waiting Area', top: 150, left: 250 },
  { name: 'Ticket Counter', top: 60, left: 100 }
];

const announcements = [
  "🚨 Platform 2 has changed to Platform 5",
  "📢 Train No. 12456 is arriving on Platform 3",
  "⚠️ Restroom near Gate A is temporarily closed",
  "🚨 Emergency Exit drill at Platform 1"
];

const Map = () => {
  const [highlight, setHighlight] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [dotPosition, setDotPosition] = useState({ top: 50, left: 50 });
  const [index, setIndex] = useState(0);
  const [lang, setLang] = useState('en');
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const t = translations[lang];

  const positions = [
    { top: 50, left: 50 },
    { top: 100, left: 150 },
    { top: 200, left: 300 },
    { top: 150, left: 400 },
    { top: 80, left: 220 },
  ];

  const speak = (text) => {
    if (accessibilityMode) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  const handleSearch = () => {
    const match = facilities.find(fac => fac.name.toLowerCase() === searchInput.toLowerCase());
    if (match) {
      setHighlight(match);
      speak(`${match.name} ${t.highlighted}`);
    } else {
      alert('Facility not found!');
      speak('Facility not found');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (index + 1) % positions.length;
      setIndex(next);
      setDotPosition(positions[next]);
    }, 3000);
    return () => clearInterval(interval);
  }, [index]);

  useEffect(() => {
    const announceInterval = setInterval(() => {
      const random = announcements[Math.floor(Math.random() * announcements.length)];
      setAlertMsg(random);
      speak(random);
    }, 10000);
    return () => clearInterval(announceInterval);
  }, [accessibilityMode]);

  const triggerSOS = () => {
    const message = "🚨 Emergency alert has been triggered. Help is on the way!";
    alert(message);
    speak(message);
  };

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: accessibilityMode ? '#000' : '#fff',
        color: accessibilityMode ? '#fff' : '#000',
        fontSize: accessibilityMode ? '18px' : '14px',
        position: 'relative'
      }}
    >
      <h2>{t.title} 🌐</h2>

      <div style={{ marginBottom: '10px' }}>
        <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ marginRight: '10px' }}>
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="ta">தமிழ்</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={accessibilityMode}
            onChange={(e) => setAccessibilityMode(e.target.checked)}
            style={{ marginRight: '5px' }}
          />
          Accessibility Mode
        </label>
      </div>

      {alertMsg && (
        <div
          style={{
            backgroundColor: '#ffcc00',
            color: '#000',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            fontWeight: 'bold',
          }}
        >
          🔔 {alertMsg}
        </div>
      )}

      <div style={{ width: '100%', maxWidth: '600px', height: '400px', border: '2px solid #ccc', overflow: 'hidden' }}>
        <TransformWrapper initialScale={1} minScale={0.5} maxScale={2}>
          <TransformComponent>
            <div style={{ position: 'relative', width: '600px', height: '400px' }}>
              <img src="/station-map.jpg" alt="Station Map" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />

              <div
                style={{
                  position: 'absolute',
                  top: `${dotPosition.top}px`,
                  left: `${dotPosition.left}px`,
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  backgroundColor: 'red',
                  animation: 'blink 1s infinite'
                }}
              />

              <svg
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                }}
              >
                {highlight && (
                  <line
                    x1={dotPosition.left + 7}
                    y1={dotPosition.top + 7}
                    x2={highlight.left + 7}
                    y2={highlight.top + 7}
                    stroke="orange"
                    strokeWidth="4"
                    strokeDasharray="5,5"
                  />
                )}
              </svg>

              {facilities.map((fac, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setHighlight(fac);
                    speak(`${fac.name} ${t.highlighted}`);
                  }}
                  title={fac.name}
                  style={{
                    position: 'absolute',
                    top: `${fac.top}px`,
                    left: `${fac.left}px`,
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'transparent',
                    border: '2px solid #00ff00',
                    borderRadius: '50%',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>

      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ padding: '10px', width: '200px', marginRight: '10px' }}
        />
        <button onClick={handleSearch}>{t.searchBtn}</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {facilities.map((fac, idx) => (
          <button
            key={idx}
            onClick={() => {
              setHighlight(fac);
              speak(`${fac.name} ${t.highlighted}`);
            }}
            style={{
              margin: '5px',
              padding: '10px 15px',
              border: 'none',
              backgroundColor: accessibilityMode ? '#ff9900' : '#007bff',
              color: 'white',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {fac.name}
          </button>
        ))}
      </div>

      {highlight && (
        <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
          🔍 {highlight.name} {t.highlighted}
        </p>
      )}

      {/* ✅ SOS Button */}
      <button
        onClick={triggerSOS}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'red',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '10px',
          border: 'none',
          fontWeight: 'bold',
          fontSize: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 999
        }}
      >
        🚨 SOS / Need Help?
      </button>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default Map;
