import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you can add your authentication logic.
    // For simplicity, we'll check if username and password are not empty.
    if (username && password) {
      onLogin();
    } else {
      setError('Username and password are required.');
    }
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '300px', margin: 'auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Login</h2>
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username" style={{ marginRight: '10px' }}>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password" style={{ marginRight: '10px' }}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div>
          <button type="submit" style={{ padding: '8px 16px', borderRadius: '4px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
