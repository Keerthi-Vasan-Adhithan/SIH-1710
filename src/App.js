import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Map from './pages/Map';
import Help from './pages/Help';
import QRScanner from './pages/QRScanner';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/help" element={<Help />} />
        <Route path="/scanner" element={<QRScanner />} />
      </Routes>
    </Router>
  );
}

export default App;
