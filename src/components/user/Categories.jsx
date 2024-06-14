import React from 'react'
import { Link } from 'react-router-dom';


const Categories = () => {

    const navCats = [     
      {
        path: "/category/women",
        value: "Women",
      },
      {
        path: "/category/men",
        value: "Men",
      },
      {
        path: "/category/kids",
        value: "Kids",
      },
      {
        path: "/category/mobiles",
        value: "Mobiles",
      },
      {
        path: "/category/electronics",
        value: "Electronics",
      },
      {
        path: "/category/Home&kitchen",
        value: "Home & Kitchen",
      },
      {
        path: "/category/beautyproducts",
        value: "Beauty Products",
      },
      {
        path: "/category/appliances",
        value: "Appliances",
      },
    ];
  return (
    <div className="  p-4">
        <ul className="flex justify-center space-x-4 md:justify-start">
            {navCats.map((link, index) => (
                <Link key={index} to={link.path}>
                    <li className="text-slate-950 font-bold hover:text-gray-300 transition duration-300">{link.value}</li>
                </Link>
            ))}
        </ul>
    </div>
  )
}

export default Categories