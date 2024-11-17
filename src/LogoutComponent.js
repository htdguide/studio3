import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Ensure this is the correct import path

const LogoutComponent = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      navigate('/login'); // Redirect to the login page after logout
    };

    performLogout();
  }, [logout, navigate]);

  // Optionally, display a message or loader while the logout process is happening
  return <div>Logging out, please wait...</div>;
};

export default LogoutComponent;
