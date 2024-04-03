import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from './firebase';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

const DumplingsMenu = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [activeTab, setActiveTab] = useState('All');
  const [dumplings] = useState([
    { id: 1, name: 'Classic Dumpling', price: 5, imageUrl: 'https://via.placeholder.com/150', category: 'Classic' },
    { id: 2, name: 'Vegetable Dumpling', price: 6, imageUrl: 'https://via.placeholder.com/150', category: 'Vegetable' },
    { id: 3, name: 'Spicy Chicken Dumpling', price: 7, imageUrl: 'https://via.placeholder.com/150', category: 'Spicy' },
    // More dumplings...
  ]);
  const [quantities, setQuantities] = useState(dumplings.reduce((acc, dumpling) => ({ ...acc, [dumpling.id]: 1 }), {}));

  const updateQuantity = (id, quantity) => {
    setQuantities({ ...quantities, [id]: quantity });
  };

  const addToCart = async (dumpling) => {
    if (!user) {
      alert('You must log in to add items to the cart.');
      navigate('/login');
      return;
    }

    const cartItem = { ...dumpling, quantity: quantities[dumpling.id] || 1 };
    const userDocRef = doc(firestore, 'users', user.email);

    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        await updateDoc(userDocRef, {
          cart: arrayUnion(cartItem)
        });
        alert(`${dumpling.name} added to cart!`);
      } else {
        console.log('User document does not exist!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart.');
    }
  };

  return (
    <div className="dumplings-menu">
      <h2>Dumplings Menu</h2>
      <div className="tabs">
        <button onClick={() => setActiveTab('All')}>All</button>
        {/* Add more buttons for different categories */}
      </div>
      <ul>
        {dumplings.filter(dumpling => activeTab === 'All' || dumpling.category === activeTab).map(dumpling => (
          <li key={dumpling.id} className="dumpling-item">
            <img src={dumpling.imageUrl} alt={dumpling.name} />
            <div>{dumpling.name}</div>
            <div>Price: ${dumpling.price}</div>
            <div>
              Quantity:
              <input
                type="number"
                value={quantities[dumpling.id]}
                onChange={(e) => updateQuantity(dumpling.id, parseInt(e.target.value, 10))}
                min="1"
              />
            </div>
            <button onClick={() => addToCart(dumpling)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DumplingsMenu;
