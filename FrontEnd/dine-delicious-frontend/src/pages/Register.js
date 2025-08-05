import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '', role: 'USER' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', user);
      alert('Registration Successful!');
      navigate('/login');
    } catch (err) {
      alert('Registration Failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" placeholder="Password" onChange={handleChange} />
        <select name="role" onChange={handleChange}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
