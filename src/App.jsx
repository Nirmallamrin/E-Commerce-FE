import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/Layout/AdminLayout";
import UserLayout from "./components/Layout/UserLayout";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminSignup from "./components/Admin/AdminSignup";
import AdminSignin from "./components/Admin/AdminSignin";
import PrivateRoute from "./components/Routes/PrivateRoute";
import CreateProduct from './components/Admin/CreateProduct'

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<UserLayout />} />
          <Route path="/dashboard" element={<PrivateRoute />} />
        </Routes>

        <Routes>
        <Route path="/dashboard" element={<AdminRoute />} />
          <Route path="/admin" element={<AdminLayout />} />
          <Route path="/admin/createproduct" element={<CreateProduct />} />

          <Route path="/admin/signin" element = {<AdminSignin/>} />
          <Route path="/admin/signup" element = {<AdminSignup/>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
