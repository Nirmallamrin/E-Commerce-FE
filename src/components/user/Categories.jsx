import React from 'react'
import { Link } from 'react-router-dom';


const Categories = () => {

    const navCats = [     
      {
        path: "/category/Women",
        value: "Women",
      },
      {
        path: "/category/Men",
        value: "Men",
      },
      {
        path: "/category/Kids",
        value: "Kids",
      },
      {
        path: "/category/Mobiles",
        value: "Mobiles",
      },
      {
        path: "/category/Electronics",
        value: "Electronics",
      },
      {
        path: "/category/HomeandKitchen",
        value: "Home & Kitchen",
      },
      {
        path: "/category/Beauty ",
        value: "Beauty Products",
      },
      {
        path: "/category/Appliances",
        value: "Appliances",
      },

      
    ];
  return (
    <div className="  p-4 overflow-x-auto whitespace-nowrap">
      <ul className="flex space-x-4 md:space-x-6 lg:space-x-8">
      

       {navCats.map((link, index) => (
                <Link key={index} to={link.path}>
                    <li className="text-slate-950 font-bold hover:text-gray-600 transition duration-300">{link.value}</li>
                </Link>
            ))}
      </ul>
    </div>
  );
}

export default Categories