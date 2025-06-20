import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://stayfinder-backend-2qaa.onrender.com/api/auth/register', {
        email,
        password,
        role,
      });

      if (response.status === 201) {
        alert('Registration successful!');
        navigate('/login');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Try again.');
      }
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create Your Account</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Choose a Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="host">Host</option>
        </select>
        <button type="submit">Register</button>
      </form>

      {error && <p className="register-error">{error}</p>}

      <p className="register-footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
