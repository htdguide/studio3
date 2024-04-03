import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc } from 'firebase/firestore';
import { firestore } from './firebase';

const SellerPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userClass, setUserClass] = useState('customer'); // Default user class is customer
  const navigate = useNavigate();

  useEffect(() => {
    // Replace this with actual authentication logic
    const fakeAuthenticationCheck = () => {
      // Simulate a logged-in user for demonstration purposes
      const fakeUser = true; // Change this to false to simulate a logged-out user
      setIsLoggedIn(fakeUser);

      // Simulate a seller user for demonstration purposes
      const fakeSeller = userClass === 'seller'; // Check if user is a seller
      setIsSeller(fakeSeller);
    };

    fakeAuthenticationCheck();
  }, [userClass]); // Add userClass as a dependency to re-evaluate when it changes

  const handleLogin = () => {
    // Replace this with actual login authentication logic
    if (username === 'seller' && password === 'sellerpassword') {
      setUserClass('seller');
    } else {
      alert('Invalid username or password');
    }
  };

  // Add your dumplingsData and other functionalities here

  return (
    <section className="seller-container">
      <h2>Seller Page</h2>
      {/* Add seller-specific functionalities here */}
      {!isLoggedIn && (
        <div>
          <h3>Login</h3>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          <div>
            <label htmlFor="userClass">User Class:</label>
            <select id="userClass" value={userClass} onChange={(e) => setUserClass(e.target.value)}>
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      )}
    </section>
  );
};

export default SellerPage;
