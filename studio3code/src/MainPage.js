import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopBar from './TopBar';
import DumplingsMenu from './DumplingsMenu';
import Cart from './Cart';
import LoginPage from './LoginPage';
import MemberPage from './MemberPage';
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import AdminPage from './AdminPage'; // Make sure to create this component
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute

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
          <Route path="/" element={<HomePage />} />
          <Route path="/dumplings" element={
            <ProtectedRoute loggedInUser={loggedInUser}>
              <DumplingsMenu />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute loggedInUser={loggedInUser}>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/member" element={
            <ProtectedRoute loggedInUser={loggedInUser}>
              <MemberPage username={loggedInUser} />
            </ProtectedRoute>
          } />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={
            <ProtectedRoute loggedInUser={loggedInUser} adminRequired={true}>
              <AdminPage username={loggedInUser} />
            </ProtectedRoute>
          } />
          {/* Add more routes for other pages as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default MainPage;
