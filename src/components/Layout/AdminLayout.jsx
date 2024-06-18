import React from "react";
import AdminApp from "../Admin/AdminApp";
import { Outlet } from "react-router-dom";


const AdminLayout = () => {
  return (
    <div>
      <nav>
        <AdminApp />
      </nav>      
      <Outlet /> 
      
    </div>
  );
};

export default AdminLayout;
