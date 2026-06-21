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
    <nav className="p-4 bg-slate-900 border-b border-slate-800 shadow-lg text-slate-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <Link to="/admin" className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors tracking-tight">Admin Dashboard</Link>
          <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
          <h2 className="hidden md:block">
            <Link to="/" className="text-sm font-medium hover:text-white transition-colors flex items-center gap-2">
              Return to <span className="text-cyan-500 text-xl font-extrabold tracking-tight">Shopy</span>
            </Link>
          </h2>
        </div>
        
        <ul className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <li>
            <Link to="/admin/manageproducts" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap">Manage Products</Link>
          </li>
          <li>
            <Link to="/admin/manageusers" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap">Manage Users</Link>
          </li>
          <li>
            <Link to="/admin/signin" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors">Login</Link>
          </li>
          <li>
            <button onClick={tokenRelease} className="px-4 py-2 rounded-lg text-sm font-bold bg-cyan-600/10 text-cyan-500 hover:bg-cyan-600 hover:text-white transition-colors">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default AdminApp;
