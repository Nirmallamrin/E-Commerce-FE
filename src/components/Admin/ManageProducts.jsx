import React from "react";
import { Link, Outlet } from "react-router-dom";



const ManageProducts = () => {
  return (
    
      <div className="p-6">
        <div className="mb-4">
          <Link to="all" className="font-bold text-blue-700">View All Products</Link>
        </div>

        <div>
          <Link to="new" className="font-bold text-blue-700">CreateProducts</Link>
        </div>
        <Outlet />
      </div>
    
  );
};

export default ManageProducts;
