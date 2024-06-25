import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem('userToken');
  return token ? children : <Navigate to="/users/signin" />;
};

export default PrivateRoute;
