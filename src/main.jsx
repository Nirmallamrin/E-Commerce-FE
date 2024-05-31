import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar.jsx';
import UserSignup from './components/Pages/user/UserSignup.jsx';
import UserSignin from './components/Pages/user/UserSignin.jsx';
import AdminSignup from './components/Pages/Admin/AdminSignup.jsx';
import AdminSignin from './components/Pages/Admin/AdminSignin.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>,
  },
  {
    path: "/users/signup",
    element: <UserSignup/>,
  },
  {
    path: "/users/signin",
    element: <UserSignin/>,
  },
  {
    path: "/admin/signup",
    element: <AdminSignup/>,
  },
  {
    path: "/admin/signin",
    element: <AdminSignin/>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
