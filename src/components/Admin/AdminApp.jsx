import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import CreateProduct from './CreateProduct'


const AdminApp = () => {
  return (
    
        <nav className="p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">
            <ul className="flex  space-x-4">
                <li className="text-3xl font-bold mb-6">
                    <h1>Admin Dashboard</h1>
                </li>
                <li>
                   <Link to="manageproducts">Manage Products</Link>
                </li>
                <li>
                    <Link to="">Manage Categories</Link>
                </li>
                <li>
                    <Link to=""> Manage Orders</Link>
                </li>
                <li>
                    <Link to=""> Manage Users</Link>
                </li>
                <li>
                    <Link to='signin'>Login </Link>
                </li>
            </ul>
            </div>
        </nav>
    
  )
}

export default AdminApp