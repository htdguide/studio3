// src/MemberPage.js
import React, { useState, useEffect } from 'react';
import { auth, firestore } from './firebase'; // Import auth from your firebase.js file
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const MemberPage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(firestore, 'users', user.email);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserInfo(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedInfo({ ...userInfo });
  };

  const handleSave = async () => {
    if (user) {
      const userDocRef = doc(firestore, 'users', user.email);
      await updateDoc(userDocRef, editedInfo);
      setUserInfo(editedInfo);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedInfo({});
  };

  return (
    <section className="member-container">
      <h2>Welcome, {userInfo.name || 'Member'}!</h2>
      {isEditing ? (
        <div>
          <label htmlFor="editedName">Name:</label>
          <input
            type="text"
            id="editedName"
            value={editedInfo.name || ''}
            onChange={(e) => setEditedInfo({ ...editedInfo, name: e.target.value })}
          />
          <br />
          <label htmlFor="editedAddress">Address:</label>
          <input
            type="text"
            id="editedAddress"
            value={editedInfo.address || ''}
            onChange={(e) => setEditedInfo({ ...editedInfo, address: e.target.value })}
          />
          <br />
          <label htmlFor="editedPhoneNumber">Phone Number:</label>
          <input
            type="text"
            id="editedPhoneNumber"
            value={editedInfo.phoneNumber || ''}
            onChange={(e) => setEditedInfo({ ...editedInfo, phoneNumber: e.target.value })}
          />
          <br />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Email: {userInfo.email}</p>
          <p>Name: {userInfo.name || 'Not provided'}</p>
          <p>Address: {userInfo.address || 'Not provided'}</p>
          <p>Phone Number: {userInfo.phoneNumber || 'Not provided'}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </section>
  );
};

export default MemberPage;
