import React from 'react';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-cyan-950 p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center space-x-4">
          <span className="text-white text-lg font-bold">Shopy</span>
          <label className="relative block w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <SearchIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search..."
              type="text"
              name="search"
            />
          </label>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <ul className="flex space-x-2">
            <Link to=''>
            <li className="text-white cursor-pointer hover:underline">Login</li>
            </Link>
          </ul>
          <ul className="flex space-x-2">
            <li className="text-white cursor-pointer hover:underline">Cart</li>
          </ul>
        </div>
        <div className="text-white cursor-pointer hover:underline mt-4 md:mt-0">
          dropdownmenu
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
