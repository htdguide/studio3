
import React from 'react';

const Cart = () => {
  const cartItems = [
    { id: 1, name: 'Dumpling 1', price: 5, quantity: 2 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section>
      <h2>Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <p>{item.name}</p>
          <p>Quantity: {item.quantity}</p>
          <p>${item.price * item.quantity}</p>
        </div>
      ))}
      <p className="cart-total">Total: ${total}</p>
    </section>
  );
};

export default Cart;
