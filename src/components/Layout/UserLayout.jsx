
import Navbar from '../Navbar/Navbar';
import Categories from '../user/Categories';
import { Outlet } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import HomeImage from '../user/HomeImage';


const UserLayout = () => {
  
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
      <div className="flex justify-center mt-8">
        <HomeImage className="w-full sm:w-auto object-cover object-center"/>
        </div>
    </div>
    </ChakraProvider>
  )
}

export default UserLayout