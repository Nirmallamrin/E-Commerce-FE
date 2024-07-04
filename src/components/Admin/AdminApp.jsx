import React from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const AdminApp = () => {
  const navigate = useNavigate()

  const tokenRelease = (e) => {
    e.preventDefault()
    sessionStorage.removeItem("adminToken");
    toast.success("Successfully logged out");
    navigate("/admin");
    
  };
  return (
    <nav className="p-4 bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">
        <h1 className="text-3xl font-bold mb-6">
          <Link to="/admin" className="hover:text-gray-300">Admin Dashboard</Link>
        </h1>
        <h2>
          <Link to="/">Return to <span className="text-cyan-500 text-3xl font-bold">Shopy</span></Link>
        </h2>
        <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <li>
            <Link to="/admin/manageproducts" className="hover:text-gray-300">Manage Products</Link>
          </li>

          <li>
            <Link to="/admin/manageusers" className="hover:text-gray-300">Manage Users</Link>
          </li>
          <li>
            <Link to="/admin/signin" className="hover:text-gray-300">Login</Link>
          </li>
          <li>
            <Link onClick={tokenRelease} to="/admin" className="hover:text-gray-300" >Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default AdminApp;
