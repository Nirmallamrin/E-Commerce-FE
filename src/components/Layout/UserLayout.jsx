import Navbar from "../Navbar/Navbar";
import Categories from "../user/Categories";
import { Outlet, useLocation } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import HomeImage from "../user/HomeImage";
import Footer from "../user/Footer";
import Reviews from "../Home/Reviews";
import Faqs from "../Home/Faqs";
import PopularProducts from "../Home/PopularProducts";
import SocialMedia from "../Home/SocialMedia";

const UserLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <ChakraProvider>
      <div id="top" className="min-h-screen flex flex-col font-sans bg-white">
        <nav>
          <Navbar />
        </nav>
        
        {isHomePage && (
          <>
            <div className="w-full">
              <HomeImage />
            </div>
            <div className="w-full">
              <Categories />
            </div>
            <div className="w-full mt-12">
              <PopularProducts />
            </div>
            <div className="w-full">
              <Reviews />
            </div>
            <div className="w-full">
              <Faqs />
            </div>
            <div className="w-full">
              <SocialMedia />
            </div>
          </>
        )}
        
        <main className="flex-grow w-full max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>

      <Footer />
    </ChakraProvider>
  );
};

export default UserLayout;
