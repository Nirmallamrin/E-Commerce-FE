import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = sessionStorage.getItem('adminToken');
  return token ? children : <Navigate to='/admin/signin'/>;
};

export default AdminRoute;
