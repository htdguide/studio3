import React, { useState, useEffect } from 'react';
import { auth, firestore } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderMessage, setOrderMessage] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        const userDocRef = doc(firestore, 'users', user.email);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data().cart) {
          const itemsWithDefaultQuantity = userDoc.data().cart.map(item => ({
            ...item,
            quantity: item.quantity || 1,
          }));
          setCartItems(itemsWithDefaultQuantity);
        } else {
          console.log('No cart items found or user document does not exist');
        }
      }
    };
    fetchCartItems();
  }, [user]);

  const updateCartItemQuantity = async (index, quantity) => {
    const updatedCartItems = cartItems.map((item, idx) => 
      idx === index ? { ...item, quantity: quantity || 1 } : item
    );
    setCartItems(updatedCartItems);
    if (user) {
      const userDocRef = doc(firestore, 'users', user.email);
      await updateDoc(userDocRef, { cart: updatedCartItems });
    }
  };

  const deleteCartItem = async (index) => {
    const updatedCartItems = cartItems.filter((_, idx) => idx !== index);
    setCartItems(updatedCartItems);
    if (user) {
      const userDocRef = doc(firestore, 'users', user.email);
      await updateDoc(userDocRef, { cart: updatedCartItems });
    }
  };

  const handlePurchase = async () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    if (user) {
      const userDocRef = doc(firestore, 'users', user.email);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const existingTotalSpend = userDoc.data().totalSpend ? userDoc.data().totalSpend : 0;
        const userAddress = userDoc.data().address ? userDoc.data().address : "No address provided";
        await updateDoc(userDocRef, {
          totalSpend: existingTotalSpend + total,
          cart: []
        });
        setCartItems([]); // Clear the cart items in local state
        setOrderMessage(`Order Created. It will be delivered to your address: ${userAddress}`);
      }
    }
  };

  if (!user) {
    return <div>Please log in to view your cart.</div>;
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {orderMessage && <div className="order-message">{orderMessage}</div>}
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <div>Name: {item.name}</div>
              <div>Price: ${item.price}</div>
              <div>
                Quantity:
                <input
                  type="number"
                  value={item.quantity || 1}
                  onChange={(e) => updateCartItemQuantity(index, parseInt(e.target.value, 10))}
                  min="1"
                />
              </div>
              <button onClick={() => deleteCartItem(index)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>Your cart is empty.</div>
      )}
      {cartItems.length > 0 && <button onClick={handlePurchase}>Purchase</button>}
    </div>
  );
};

export default Cart;
