import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'


const AdminApp = () => {
  return (
    <div>
        <nav>
            <ul>
                <li><h1>Admin Dashboard</h1></li>
                <li>
                   <Link >Manage Products</Link>
                </li>
                <li>
                    <Link>Manage Categories</Link>
                </li>
                <li>
                    <Link> Manage Orders</Link>
                </li>
                <li>
                    <Link> Manage Users</Link>
                </li>
                <li>
                    <Link to='/'>Login </Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default AdminApp