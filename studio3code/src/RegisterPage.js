// src/RegisterPage.js
import React, { useState } from 'react';
import { auth, firestore } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      // Step 1: Create account in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check user creation was successful
      if (user) {
        // Step 2: Create a Firestore document with the user's email as the document ID
        const userDocRef = doc(firestore, 'users', email);
        await setDoc(userDocRef, {
          email,
          name,
          address,
          phoneNumber,
        });

        // Log the document reference for verification (optional)
        console.log('Document written with ID: ', userDocRef.id);

        // Navigate to the login page after successful registration
        navigate('/login');
      } else {
        alert('User creation failed. No user object returned.');
      }
    } catch (error) {
      alert('Account creation failed. Please check your information and try again.');
      console.error('Error during registration:', error);
    }
  };

  return (
    <section className="register-container">
      <h2>Register</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
      <button className="auth-button" onClick={handleRegistration}>
        Register
      </button>
    </section>
  );
};

export default RegisterPage;
