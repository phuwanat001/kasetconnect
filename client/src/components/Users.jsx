import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      {users.map(user => (
        <p key={user._id}>{user.name} - {user.email}</p>
      ))}
    </div>
  );
}

export default Users;
