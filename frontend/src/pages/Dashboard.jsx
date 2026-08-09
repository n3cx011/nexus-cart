import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>Welcome to Nexus Cart, {username}!</h1>
      <p>Manage your microservices ecosystem seamlessly from here.</p>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <Link to="/orders" style={{ padding: '15px 25px', backgroundColor: '#17a2b8', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          View & Create Orders
        </Link>
        <button onClick={handleLogout} style={{ padding: '15px 25px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
    </div>
  );
}