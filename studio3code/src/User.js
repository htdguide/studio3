
import React from 'react';

function User({ users }) {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <img
            src={user.avatar} 
            alt={`${user.firstName} ${user.lastName}`}
            className="user-photo"
          />
          <h2>{`${user.firstName} ${user.lastName}`}</h2>
          <p>{`ID: ${user.id}`}</p>
          <p>{`email: ${user.email}`}</p>
          <p>{`Date of birth: ${user.dob}`}</p>
        </div>
      ))}
    </div>
  );
}

export default User;

