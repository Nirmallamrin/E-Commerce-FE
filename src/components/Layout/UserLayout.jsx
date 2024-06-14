import React from 'react';
import Navbar from '../Navbar/Navbar';
import Categories from '../user/Categories';
import { Outlet } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';


const UserLayout = () => {
  return (
    <ChakraProvider>
    <div>
      <nav>
        <Navbar />
      </nav> 
      
      <div className="flex justify-center">
        <Categories/>
      </div>
      <Outlet/>
      
    </div>
    </ChakraProvider>
  )
}

export default UserLayout