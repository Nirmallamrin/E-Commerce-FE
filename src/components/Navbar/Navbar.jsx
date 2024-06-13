import React from "react";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/outline";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Button,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { SearchIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-cyan-100  p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <span className="text-slate-950 text-lg font-bold">Shopy</span>
          </Link>
          <label className="relative block w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <SearchIcon
                className="h-5 w-5 text-slate-400"
                aria-hidden="true"
              />
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
            <Link to="/users/signin">
              <li className="text-slate-950 cursor-pointer hover:underline">
                Login
              </li>
            </Link>
          </ul>
          <ul className="flex space-x-2">
            <li className="text-slate-950  cursor-pointer hover:underline">
              Cart
            </li>
          </ul>
        </div>
        <Menu >
          <MenuButton 
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList className="bg-white ">
            <MenuItem  >
              New Tab
            </MenuItem>
            <MenuItem  >
              New Window
            </MenuItem>
            <MenuItem >
              Open Closed Tab
            </MenuItem>
            <MenuItem >
              Open File...
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
