import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await fetch('http://localhost:8082/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const responseBody = await response.text(); // First, get the response as text

      try {
        console.log(responseBody);
        const data = JSON.parse(responseBody); // Then, attempt to parse it as JSON
        if (response.ok) {
          console.log('Login successful:', data);
          localStorage.setItem('userToken', data.token); // Assuming the token is directly accessible
          navigate('/dashboard'); // Redirect on success
        } else {
          setError(data.message || 'Incorrect username or password'); // Show custom error messages
        }
      } catch (error) {
        console.error('Failed to parse JSON response:', error);
        setError('Server response was not in valid JSON format. Please try again later.');
      }
    } catch (error) {
      console.error('Login request failed:', error);
      setError('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome to Future Bank</h1>
        {error && <p className="error-message">{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-footer">
            <button type="submit" className="login-button">Log In</button>
            <div className="links">
              <a href="#forgot">Forgot Password?</a>
              <button type="button" onClick={() => navigate('/register')}>Register</button>
            </div>
          </div>
        </form>
        <div className="security-tips">
          <h3>Security Tips:</h3>
          <ul>
            <li>Do not share your username and password with anyone.</li>
            <li>Always log out after completing your session.</li>
            <li>Ensure your computer is protected with up-to-date antivirus software.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
