import React, { useEffect, useState } from 'react';
import { firestore } from './firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import './AdminPage.css'; // Ensure the CSS file path is correct

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserInfo, setEditedUserInfo] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollectionRef = collection(firestore, 'users');
      const userData = await getDocs(usersCollectionRef);
      setUsers(userData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      if (userData.docs.length > 0) {
        setActiveUserId(userData.docs[0].id); // Set the first user as active by default
      }
    };
    fetchUsers();
  }, []);

  const startEditing = (user) => {
    setEditingUserId(user.id);
    setEditedUserInfo({ ...user });
  };

  const handleUserUpdate = async () => {
    const userDocRef = doc(firestore, 'users', editingUserId);
    await updateDoc(userDocRef, editedUserInfo);
    setEditingUserId(null); // Exit editing mode
    const updatedUsers = users.map(user => user.id === editingUserId ? { ...user, ...editedUserInfo } : user);
    setUsers(updatedUsers); // Optimistically update the local state
  };

  const clearCart = async (userId) => {
    const userDocRef = doc(firestore, 'users', userId);
    await updateDoc(userDocRef, { cart: [] });
    const updatedUsers = users.map(user => user.id === userId ? { ...user, cart: [] } : user);
    setUsers(updatedUsers); // Optimistically update the local state
  };

  const deleteUser = async (userId) => {
    await deleteDoc(doc(firestore, 'users', userId));
    const remainingUsers = users.filter(user => user.id !== userId);
    setUsers(remainingUsers); // Optimistically update the local state
    // If the deleted user was the active tab, switch to another tab
    if (userId === activeUserId && remainingUsers.length > 0) {
      setActiveUserId(remainingUsers[0].id);
    } else if (remainingUsers.length === 0) {
      setActiveUserId(null); // No users left
    }
  };

  return (
    <section className="admin-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard. Here you can view sales statistics and manage the application.</p>
      <div className="tabs">
        {users.map(user => (
          <button key={user.id} onClick={() => setActiveUserId(user.id)} className={`tab ${activeUserId === user.id ? 'active' : ''}`}>
            {user.name}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {users.filter(user => user.id === activeUserId).map(user => (
          <div key={user.id} className="user-details">
            {editingUserId === user.id ? (
              <>
                <input className="edit-field" type="text" value={editedUserInfo.name} onChange={(e) => setEditedUserInfo({ ...editedUserInfo, name: e.target.value })} />
                <input className="edit-field" type="text" value={editedUserInfo.address} onChange={(e) => setEditedUserInfo({ ...editedUserInfo, address: e.target.value })} />
                <input className="edit-field" type="text" value={editedUserInfo.phoneNumber} onChange={(e) => setEditedUserInfo({ ...editedUserInfo, phoneNumber: e.target.value })} />
                <button className="save-btn" onClick={handleUserUpdate}>Save</button>
              </>
            ) : (
              <>
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Address: {user.address}</p>
                <p>Phone: {user.phoneNumber}</p>
                <p>Total Spend: ${user.totalSpend || 0}</p>  {/* Added totalSpend */}
                <button className="edit-btn" onClick={() => startEditing(user)}>Edit</button>
                <button className="clear-cart-btn" onClick={() => clearCart(user.id)}>Clear Cart</button>
                <button className="delete-user-btn" onClick={() => deleteUser(user.id)}>Delete User</button>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminPage;
