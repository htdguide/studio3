
  ];

  const addToCart = (dumpling, quantity) => {
    const item = { ...dumpling, quantity };
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <section className="menu-container">
      <h2>Dumplings Menu</h2>
      <div className="menu-list">
        {dumplingsData.map((dumpling) => (
          <div key={dumpling.id} className="menu-item">
            <img src={dumpling.image} alt={dumpling.name} />
            <div className="item-details">
              <p className="item-name">{dumpling.name}</p>
              <p className="item-price">${dumpling.price}</p>
            </div>
            <div className="item-actions">
              <div className="quantity-display">
                <input type="number" min="1" defaultValue="1" className="quantity-input" />
              </div>
              <button
                className="buy-button"
                onClick={() => {
                  const quantity = parseInt(document.querySelector('.quantity-input').value, 10);
                  addToCart(dumpling, quantity);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Cart Summary</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} x {item.quantity} - ${item.price * item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default DumplingsMenu;
