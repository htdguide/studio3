import React, { useEffect, useState } from 'react';
import { auth, firestore, storage } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const DumplingsMenu = () => {
  const user = auth.currentUser;
  const [dumplings, setDumplings] = useState([]);
  const [userClass, setUserClass] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchDumplings = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'dumplings'));
        const dumplingsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDumplings(dumplingsData);
      } catch (error) {
        console.error("Error fetching dumplings:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserClass = async () => {
      if (user) {
        try {
          const userRef = doc(firestore, 'users', user.email);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserClass(userSnap.data().userClass);
          }
        } catch (error) {
          console.error("Error fetching user class:", error);
        }
      }
    };

    fetchDumplings();
    fetchUserClass();
  }, [user]);

  const addItem = async () => {
    setLoading(true);
    try {
      const newDumplingRef = await addDoc(collection(firestore, 'dumplings'), {
        name: 'New Dumpling',
        price: 0,
        imageUrl: '',
        category: 'New'
      });
      const newDumpling = { id: newDumplingRef.id, name: 'New Dumpling', price: 0, imageUrl: '', category: 'New' };
      setDumplings([...dumplings, newDumpling]);
    } catch (error) {
      console.error("Error adding new dumpling:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file, dumplingId) => {
    if (!file) return;
    setLoading(true);
    try {
      const imageRef = ref(storage, `dumplings/${dumplingId}`);
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);
      await updateDumplingDetails(dumplingId, { imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateDumplingDetails = async (dumplingId, details) => {
    try {
      const dumplingRef = doc(firestore, 'dumplings', dumplingId);
      await updateDoc(dumplingRef, details);
      const updatedDumplings = dumplings.map(dumpling => dumpling.id === dumplingId ? { ...dumpling, ...details } : dumpling);
      setDumplings(updatedDumplings);
    } catch (error) {
      console.error("Error updating dumpling details:", error);
    }
  };

  const deleteDumpling = async (dumplingId) => {
    if (userClass !== 'seller') return;
    try {
      const dumplingRef = doc(firestore, 'dumplings', dumplingId);
      await deleteDoc(dumplingRef);
      const updatedDumplings = dumplings.filter(dumpling => dumpling.id !== dumplingId);
      setDumplings(updatedDumplings);
    } catch (error) {
      console.error("Error deleting dumpling:", error);
    }
  };

  const addToCart = async (dumpling) => {
    if (!user || userClass === 'seller') {
      alert("Sellers can't add items to the cart.");
      return;
    }
  
    try {
      const userRef = doc(firestore, 'users', user.email);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        let updatedCart = [];
        if (userData.cart && Array.isArray(userData.cart)) {
          updatedCart = [...userData.cart, { ...dumpling, quantity: 1 }];
        } else {
          updatedCart = [{ ...dumpling, quantity: 1 }];
        }
        await updateDoc(userRef, { cart: updatedCart });
        alert(`${dumpling.name} added to cart!`);
      } else {
        alert('User not found.');
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert('Failed to add item to cart.');
    }
  };
  
  

  if (!user) {
    return <div>Please log in to view the dumplings menu.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dumplings-menu">
      <h2>Dumplings Menu</h2>
      {userClass === 'seller' && (
        <button onClick={addItem} disabled={loading}>Add New Dumpling</button>
      )}
      <ul>
        {dumplings.map(dumpling => (
          <li key={dumpling.id} className="dumpling-item">
            {userClass === 'seller' ? (
              <>
                <input
                  type="text"
                  value={dumpling.name}
                  onChange={(e) => updateDumplingDetails(dumpling.id, { name: e.target.value })}
                />
                <input
                  type="number"
                  value={dumpling.price}
                  onChange={(e) => updateDumplingDetails(dumpling.id, { price: parseFloat(e.target.value) })}
                />
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e.target.files[0], dumpling.id)}
                />
                <img src={dumpling.imageUrl} alt={dumpling.name} style={{ width: '100px', height: '100px' }} />
                <button onClick={() => deleteDumpling(dumpling.id)}>Delete</button>
              </>
            ) : (
              <>
                <img src={dumpling.imageUrl} alt={dumpling.name} style={{ width: '100px', height: '100px' }} />
                <div>{dumpling.name}</div>
                <div>Price: ${dumpling.price}</div>
                {userClass && (
                  <button onClick={() => addToCart(dumpling)}>Add to Cart</button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DumplingsMenu;
