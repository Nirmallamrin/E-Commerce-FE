import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { SearchIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    
    const userToken = sessionStorage.getItem("userToken");
    if (userToken) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const tokenRelease = () => {
    sessionStorage.removeItem("userToken");
    toast.success("Successfully logged out");
    setAuthenticated(false);
    navigate("/");
  };

  const handleSearchChange = () => {};

  const handleSearchSubmit = () => {};

  return (
    <nav className="bg-cyan-100 p-4 md:p-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <span className="text-slate-950 text-3xl font-bold">Shopy</span>
          </Link>
          <form
            onSubmit={handleSearchSubmit}
            className="relative block w-full md:w-96 max-w-xs"
          >
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
              onChange={handleSearchChange}
            />
          </form>
        </div>

        <div className="hidden md:flex items-center space-x-4 mt-4">
           {authenticated ? (
            <span
              className="text-slate-950 cursor-pointer hover:underline flex items-center"
              onClick={tokenRelease}
            >
              Logout
            </span>
          ) : (
            <Link to="/users/signin">
              <span className="text-slate-950 cursor-pointer hover:underline flex items-center">
                Login
              </span>
            </Link>
          )}
          

          <Link to="cart">
            <span className="text-slate-950 cursor-pointer hover:underline flex items-center">
              <ShoppingCartIcon className="h-5 w-5 mr-1" /> Cart
            </span>
          </Link>

          <Link to="orders">
            <span className="text-slate-950 cursor-pointer hover:underline">
              My Orders
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList className="bg-white">
              <div className="md:hidden">
                
              {authenticated ? (
                  <MenuItem onClick={tokenRelease}>Logout</MenuItem>
                ) : (
                  <MenuItem>
                    <Link to="/users/signin">Login</Link>
                  </MenuItem>
                )}
                
                <MenuItem>
                  <Link to="cart">Cart</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="orders">My Orders</Link>
                </MenuItem>
              </div>
              <MenuItem>My Profile</MenuItem>
              <MenuItem>Report Us</MenuItem>
              <MenuItem>Customer Service</MenuItem>
              
              <MenuItem>
                <Link to="admin/signin">Admin</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
