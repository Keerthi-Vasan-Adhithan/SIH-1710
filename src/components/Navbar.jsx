import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', background: '#222', color: 'white' }}>
      <Link to="/" style={{ margin: '0 10px', color: 'white' }}>Home</Link>
      <Link to="/map" style={{ margin: '0 10px', color: 'white' }}>Map</Link>
      <Link to="/help" style={{ margin: '0 10px', color: 'white' }}>Help</Link>
      <Link to="/scanner" style={{ margin: '0 10px', color: 'white' }}>QR Scanner</Link>
    </nav>
  );
};

export default Navbar;
