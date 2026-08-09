import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../services/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authApi.post('/auth/register', { username, password });
      navigate('/');
    } catch (err) {
      setError('Registration failed. Try a different username.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <form onSubmit={handleRegister} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '300px' }}>
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ marginBottom: '10px' }}>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>Register</button>
        <p style={{ marginTop: '10px' }}>Already have an account? <Link to="/">Login</Link></p>
      </form>
    </div>
  );
}