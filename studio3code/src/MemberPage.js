import React from 'react';

const MemberPage = ({ username }) => {
  return (
    <section style={{ backgroundImage: `https://ik.imagekit.io/awwybhhmo/satellite_images/chinese/beyondmenu/hero/11.jpg?tr=w-3840,q-50` }}>
      <div className="hero">
        <h2>Welcome, {username}!</h2>
      </div>
    </section>
  );
};

export default MemberPage;
