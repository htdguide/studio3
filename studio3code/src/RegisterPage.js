import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userClass, setUserClass] = useState('customer');
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Here you'd store additional user information to Firestore if needed
      // Example Firestore function call: setDoc(doc(firestore, 'users', user.uid), { name, address, phoneNumber, userClass });
      console.log('Account creation successful:', user.uid);
      navigate('/member');
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Account creation failed. Please check your information and try again.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card my-5">
            <div className="card-body">
              <form onSubmit={handleRegistration}>
                <h3 className="mb-3 font-weight-normal text-center">Register</h3>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    id="address"
                    className="form-control"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    className="form-control"
                    placeholder="Phone Number"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email address"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="userClass">User Class:</label>
                  <select
                    id="userClass"
                    className="form-control"
                    value={userClass}
                    onChange={(e) => setUserClass(e.target.value)}
                  >
                    <option value="customer">Customer</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">
                  Register
                </button>
                <p className="mt-2 text-center">
                  {/* Add link back to the login page if you have one */}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
