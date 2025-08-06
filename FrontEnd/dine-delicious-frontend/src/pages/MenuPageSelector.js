import React from 'react';
import MenuList from './MenuList';
import MenuAdmin from './MenuAdmin';
import { useAuth } from '../context/AuthProvider';

const MenuPageSelector = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  return user.role === 'ADMIN' ? <MenuAdmin /> : <MenuList />;
};

export default MenuPageSelector;
