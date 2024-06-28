import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import { AuthProvider } from "./contexts/AuthContexts.jsx";
import UserLayout from "./components/Layout/UserLayout.jsx";
import UserSignin from "./components/user/UserSignin.jsx";
import UserSignup from "./components/user/UserSignup.jsx";
import ProductCard from "./components/user/ProductCard.jsx";
import AdminSignin from "./components/Admin/AdminSignin.jsx";
import AdminSignup from "./components/Admin/AdminSignup.jsx";
import AdminLayout from "./components/Layout/AdminLayout.jsx";
import CreateProduct from "./components/Admin/CreateProduct.jsx";
import CategoryProducts from "./components/user/CategoryProducts.jsx";
import Categories from "./components/user/Categories.jsx";
import AllProducts from "./components/Admin/AllProducts.jsx";
import ManageProducts from "./components/Admin/ManageProducts.jsx";
import SingleProduct from "./components/user/SingleProduct.jsx";
import Cart from "./components/user/Cart.jsx";
import PrivateRoute from "./components/Routes/PrivateRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Order from "./components/user/Order.jsx";
import Payment from "./components/user/Payment.jsx";
import PaymentSuccess from "./components/user/PaymentSuccess.jsx";
import UserOrders from "./components/user/UserOrders.jsx";
import AboutUsContactUs from "./components/Pages/AboutContactUs.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "category/:categoryName",
        element: <CategoryProducts />,
      },
      {
        path: "productcard",
        element: <ProductCard />,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "order",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
          
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <PrivateRoute>
            <UserOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },

      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "users/signin",
    element: <UserSignin />,
  },
  {
    path: "users/signup",
    element: <UserSignup />,
  },
  {
    path: "categories",
    element: <Categories />,
  },
  {
    path: "/about-contact",
    element: <AboutUsContactUs />,
  },


  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "signin",
        element: <AdminSignin />,
      },
      {
        path: "signup",
        element: <AdminSignup />,
      },
      {
        path: "manageproducts",
        element: <ManageProducts />,
        children: [
          {
            path: "all",
            element: <AllProducts />,
          },
          {
            path: "new",
            element: <CreateProduct />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />  
        <ToastContainer />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
