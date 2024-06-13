import React from 'react';
import Navbar from '../Navbar/Navbar';
import Categories from './Categories';
import { Outlet } from 'react-router-dom';
import CategoryProducts from '../user/CategoryProducts';

const UserLayout = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav> 
      
      <div className="flex justify-center">
        <Categories/>
      </div>
      <Outlet/>
      
    </div>

  )
}

export default UserLayout