// src/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleAuthentication = async () => {
    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert('Account created successfully!');
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        onLogin(user.email);
        navigate('/member');
      }
    } catch (error) {
      alert('Authentication failed. Please check your credentials and try again.');
      console.error(error);
    }
  };

  return (
    <section className="login-container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="auth-button" onClick={handleAuthentication}>
        {isRegistering ? 'Register' : 'Login'}
      </button>
      {isRegistering && (
        <p>
          Already have an account?{' '}
          <Link to="/login" className="register-link">
            Login here
          </Link>
        </p>
      )}
    </section>
  );
};

export default LoginPage;
