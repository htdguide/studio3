// src/MainPage.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopBar from './TopBar';
import DumplingsMenu from './DumplingsMenu';
import Cart from './Cart';

const HomePage = () => {
  return (
    <section>
      <div className="hero">
        <h1>Welcome to Dumplings Paradise</h1>
        <p>Discover the art of dumplings with our delightful menu.</p>
      </div>
    </section>
  );
};

const MainPage = () => {
  return (
    <Router>
      <div>
        <TopBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dumplings" element={<DumplingsMenu />} />
          <Route path="/cart" element={<Cart />} />
          {/* Add more routes for other pages */}
        </Routes>
      </div>
    </Router>
  );
};

export default MainPage;
