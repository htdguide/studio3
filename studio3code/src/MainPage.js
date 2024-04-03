
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopBar from './TopBar';
import DumplingsMenu from './DumplingsMenu';
import Cart from './Cart';
import LoginPage from './LoginPage';
import MemberPage from './MemberPage';
import HomePage from './HomePage';

const MainPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  return (
    <Router>
      <div>
        <TopBar loggedInUser={loggedInUser} />
        <Routes>
          <Route
            path="/"
            element={<HomePage />} 
          />
          <Route path="/dumplings" element={<DumplingsMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        </Routes>
      </div>
    </Router>
  );
};

export default MainPage;
