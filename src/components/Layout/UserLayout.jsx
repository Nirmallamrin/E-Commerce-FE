import Navbar from "../Navbar/Navbar";
import Categories from "../user/Categories";
import { Outlet, useLocation } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import HomeImage from "../user/HomeImage";
import Footer from "../user/Footer";

const UserLayout = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  return (
    <ChakraProvider>
      <div>
        <nav>
          <Navbar />
        </nav>
        <div className="flex justify-center">
          <Categories />
        </div>
        <Outlet />
      </div>

      {isHomePage && (
      <div className="flex justify-center mt-8">
        <HomeImage className="w-full sm:w-auto object-cover object-center" />
      </div>
      
      )}
      <div>
        <Footer/>
      </div>
    </ChakraProvider>
  );
};

export default UserLayout;
