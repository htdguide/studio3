// src/DumplingsMenu.js
import React from 'react';

const DumplingsMenu = () => {
  // Dummy data for dumplings
  const dumplingsData = [
    { id: 1, name: 'Dumpling 1', price: 5, image: 'dumpling1.jpg' },
    { id: 2, name: 'Dumpling 2', price: 6, image: 'dumpling2.jpg' },
    // Add more dumplings as needed
  ];

  return (
    <section>
      <h2>Dumplings Menu</h2>
      {dumplingsData.map((dumpling) => (
        <div key={dumpling.id} className="menu-item">
          <img src={dumpling.image} alt={dumpling.name} />
          <p>{dumpling.name}</p>
          <p>${dumpling.price}</p>
          <button className="buy-button">Add to Cart</button>
        </div>
      ))}
    </section>
  );
};

export default DumplingsMenu;
