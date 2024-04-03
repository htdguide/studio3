import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from './firebase'; // Ensure these imports are correct
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const MemberPage = () => {
  const [userInfo, setUserInfo] = useState({ email: '', name: '', address: '', phoneNumber: '', userClass: '' }); // Include userClass in the initial state
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    if (user) {
      const userDocRef = doc(firestore, 'users', user.email);
      await updateDoc(userDocRef, userInfo);
      setIsEditing(false);
    }
  };

  const handleCancel = () => setIsEditing(false);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  const navigateToAdmin = () => navigate('/admin'); // Adjust as needed for your admin page route

  return (
    <section className="member-container">
      <h2>Welcome, {userInfo.name || 'Member'}!</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>Email: <span>{userInfo.email}</span></div> {/* Email is typically not editable */}

        {!isEditing ? (
          <>
            <div>Name: {userInfo.name || 'Not provided'}</div>
            <div>Address: {userInfo.address || 'Not provided'}</div>
            <div>Phone Number: {userInfo.phoneNumber || 'Not provided'}</div>
            <button type="button" onClick={handleEdit}>Edit</button>
          </>
        ) : (
          <>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={userInfo.name} onChange={handleChange} />
            </div>
            <div>
              <label>Address:</label>
              <input type="text" name="address" value={userInfo.address} onChange={handleChange} />
            </div>
            <div>
              <label>Phone Number:</label>
              <input type="text" name="phoneNumber" value={userInfo.phoneNumber} onChange={handleChange} />
            </div>
            <button type="button" onClick={handleSave}>Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </>
        )}

        <button type="button" onClick={handleLogout}>Logout</button>
        
        {userInfo.userClass === 'admin' && (
          <button style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }} onClick={navigateToAdmin}>
            Admin
          </button>
        )}
      </form>
    </section>
  );
};

export default MemberPage;
