import React, { useEffect } from 'react';
import MenuList from './MenuList';
import MenuAdmin from './MenuAdmin';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const MenuPageSelector = () => {
  const { user, loading: authLoading } = useAuth();  // assume context provides loading
  const navigate = useNavigate();

  useEffect(() => {
    // Wait until auth is done loading
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || !user) {
    return <p>Loading...</p>;
  }

  return user.role === 'ADMIN' ? <MenuAdmin /> : <MenuList />;
};

export default MenuPageSelector;
