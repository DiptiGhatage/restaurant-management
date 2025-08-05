import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; // ✅ Use configured instance
import { useAuth } from '../context/AuthProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Call correct backend API
      const res = await axiosInstance.post('/auth/login', { email, password });

      const { token } = res.data;
      localStorage.setItem('token', token);

      // ✅ Decode JWT token to extract role and username
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.roles[0].replace('ROLE_', '');
      const username = payload.sub;

      // ✅ Save auth data
      login({ username, role, token });

      // ✅ Redirect based on role
      if (role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }

    } catch (err) {
      console.error('Login failed:', err);
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Login</button>
      </form>
    </div>
  );
};

export default Login;
