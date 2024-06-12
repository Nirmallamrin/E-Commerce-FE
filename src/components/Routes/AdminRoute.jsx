import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = sessionStorage.getItem('userToken');
  const user = JSON.parse(sessionStorage.getItem('user')); // Assuming user info is stored in session storage

  return token && user?.isAdmin ? children : <Navigate to='/admin/signin'/>;
};

export default AdminRoute;
