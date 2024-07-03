import React from 'react';
import {  Link } from 'react-router-dom';

const AdminApp = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">
        <h1 className="text-3xl font-bold mb-6">
          <Link to="/admin" className="hover:text-gray-300">Admin Dashboard</Link>
        </h1>
        <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <li>
            <Link to="/admin/manageproducts" className="hover:text-gray-300">Manage Products</Link>
          </li>
          <li>
            <Link to="/admin/managecategories" className="hover:text-gray-300">Manage Categories</Link>
          </li>
          <li>
            <Link to="/admin/manageorders" className="hover:text-gray-300">Manage Orders</Link>
          </li>
          <li>
            <Link to="/admin/manageusers" className="hover:text-gray-300">Manage Users</Link>
          </li>
          <li>
            <Link to="signin" className="hover:text-gray-300">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default AdminApp;
