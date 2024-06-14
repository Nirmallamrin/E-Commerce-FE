import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import UserLayout from './components/Layout/UserLayout.jsx';
import UserSignin from './components/user/UserSignin.jsx';
import UserSignup from './components/user/UserSignup.jsx';
import ProductCard from './components/user/ProductCard.jsx';
import AdminSignin from './components/Admin/AdminSignin.jsx'
import AdminSignup from './components/Admin/AdminSignup.jsx'
import AdminLayout from './components/Layout/AdminLayout.jsx';
import CreateProduct from './components/Admin/CreateProduct.jsx';
import CategoryProducts from './components/user/CategoryProducts.jsx';
import Categories from './components/user/Categories.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<UserLayout/>,
    children: [
        
      {
        path:"category/:categoryName",
        element:<CategoryProducts/>,

      },
      {
        path:"productcard",
        element:<ProductCard/>,
      },
            
    ]
  },
  {
    path:"users/signin",
    element:<UserSignin/>
  },
  {
    path:"users/signup",
    element:<UserSignup/>
  },
  {
    path:"categories",
    element:<Categories/>,
  },
  {
    path:"categories",
    element:<Categories/>,
  },

  {
    path:"/admin",
    element:<AdminLayout/>,  
    children: [
    {
      path:'signin',
      element:<AdminSignin />
    },
    {
      path:'signup',
      element:<AdminSignup/>
    },
    {
      path:'manageproducts',
      element:<CreateProduct/>
    },
  ]
  },
])



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,

  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>
);
