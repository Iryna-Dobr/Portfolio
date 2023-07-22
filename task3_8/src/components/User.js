import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const User = () => {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    await fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
      User List
      <ul>
        {users.map((user) => (
          <li><Link to={`/user/${user.id}`}>{user.name} - {user.username}</Link></li>
        ))
        }
      </ul>
    </div>
  );
}

export default User;
