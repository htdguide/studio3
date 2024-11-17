import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      onLogin(userCredential.user);
      navigate('/member');
    } catch (error) {
      alert('Login failed. Please check your credentials and try again.');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5 col-lg-3">
          <div className="card my-5">
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <h3 className="mb-3 font-weight-normal text-center">Please sign in</h3>
                <div className="form-group">
                  <label htmlFor="inputEmail" className="sr-only">Email address</label>
                  <input 
                    type="email" 
                    id="inputEmail" 
                    className="form-control" 
                    placeholder="Email address" 
                    required 
                    autoFocus 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputPassword" className="sr-only">Password</label>
                  <input 
                    type="password" 
                    id="inputPassword" 
                    className="form-control" 
                    placeholder="Password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary btn-block" type="submit" style={{ fontSize: '80%' }}>Sign in</button>
                <p className="text-center mt-4">
                  <Link to="/register" className="register-link">Don't have an account? Register</Link>
                </p>
                <p className="mt-5 mb-3 text-muted text-center">© 2017-2022</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
