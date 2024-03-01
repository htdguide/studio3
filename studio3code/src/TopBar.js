// src/TopBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <header>
      <nav className="top-bar">
        <Link to="/" className="menu-button">
          <div className="button-inner">
            <span>Home</span>
          </div>
        </Link>
        <Link to="/dumplings" className="menu-button">
          <div className="button-inner">
            <span>Dumplings</span>
          </div>
        </Link>
        <Link to="/cart" className="menu-button">
          <div className="button-inner">
            <span>Cart</span>
          </div>
        </Link>
      </nav>
    </header>
  );
};

export default TopBar;
