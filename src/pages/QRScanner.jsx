import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [platform, setPlatform] = useState('');

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);

      if (data.includes('platform-1')) {
        setPlatform('Platform 1');
        speak('Platform 1 has been detected');
      } else if (data.includes('platform-2')) {
        setPlatform('Platform 2');
        speak('Platform 2 has been detected');
      } else {
        setPlatform('Unknown');
        speak('Platform not recognized');
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🎫 Scan Your Ticket QR</h2>

      <div style={{ maxWidth: '300px', margin: '20px auto' }}>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>

      {scanResult && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>QR Code:</strong> {scanResult}</p>
          <p><strong>Detected:</strong> {platform}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
