import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const history = useHistory();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (email === '' || password === '') {
      setError('Email and password are required.');
      return;
    }

    if (email !== 'demo@example.com' || password !== 'password123') {
      setError('Invalid credentials. Please try again.');
      setSuccess('');
      return;
    }

    // Clear errors on successful login
    setError('');
    setSuccess('Login successful!');

    // Remember me functionality
    sessionStorage.setItem('userEmail', email);
  
    // Navigate to the dashboard
    setTimeout(() => {
      history.push('/dashboard');
    }, 2000); // Redirect after 2 seconds to see success message
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
};

export default LoginPage;