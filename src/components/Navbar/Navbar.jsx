import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { SearchIcon, ShoppingCartIcon, UserIcon, PhoneIcon, HeartIcon } from "@heroicons/react/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setWishlist } from "../../redux/actions/WishlistActions";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userToken = sessionStorage.getItem("userToken");
    const name = sessionStorage.getItem("userName");
    if (userToken) {
      setAuthenticated(true);
      setUserName(name || "");
      
      axios.get(`${window.API_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      .then(res => dispatch(setWishlist(res.data)))
      .catch(err => console.error("Failed to load wishlist", err));
      
    } else {
      setAuthenticated(false);
      setUserName("");
      dispatch(setWishlist([]));
    }
  }, [dispatch, location.pathname]);

  const tokenRelease = () => {
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("userName");
    toast.success("Successfully logged out");
    setAuthenticated(false);
    setUserName("");
    navigate("/");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    // Fetch products for search autocomplete
    axios.get(`${window.API_URL}/product/products`)
      .then(res => setAllProducts(res.data))
      .catch(err => console.error("Failed to fetch products for search", err));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white text-xs py-2.5 px-4 w-full shadow-inner">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-shopcart-green font-medium">
            <PhoneIcon className="h-4 w-4" />
            <span>+001234567890</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="tracking-wide">
              Get <span className="text-shopcart-green font-bold">50% Off</span>{" "}
              on Selected Items
            </span>
            <span className="text-gray-500 mx-2">|</span>
            <Link
              to="/"
              className="hover:text-shopcart-green font-semibold transition-colors"
            >
              Shop Now
            </Link>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <button className="flex items-center gap-1 hover:text-shopcart-green transition-colors">
              Eng <ChevronDownIcon />
            </button>
            <button className="flex items-center gap-1 hover:text-shopcart-green transition-colors">
              Location <ChevronDownIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-shopcart-border px-4 py-4 w-full sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap lg:flex-nowrap">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="text-3xl font-black tracking-tighter text-black bg-clip-text bg-gradient-to-r from-shopcart-dark to-slate-700 relative">
              Shopy
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 font-semibold text-slate-700">
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-shopcart-green transition-colors py-2">
              <span>Categories</span>
              <ChevronDownIcon className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-300" />

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-slate-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden transform translate-y-2 group-hover:translate-y-0">
                <div className="p-2 grid grid-cols-2 gap-0">
                  <Link
                    to="/category/Women"
                    className="px-4 py-2 hover:bg-slate-50 rounded-lg hover:text-shopcart-green transition-colors font-medium text-slate-700"
                  >
                    Women
                  </Link>
                  <Link
                    to="/category/Men"
                    className="px-4 py-2 hover:bg-slate-50 rounded-lg hover:text-shopcart-green transition-colors font-medium text-slate-700"
                  >
                    Men
                  </Link>
                  <Link
                    to="/category/Kids"
                    className="px-4 py-2 hover:bg-slate-50 rounded-lg hover:text-shopcart-green transition-colors font-medium text-slate-700"
                  >
                    Kids
                  </Link>
                  <Link
                    to="/category/Mobiles"
                    className="px-4 py-2 hover:bg-slate-50 rounded-lg hover:text-shopcart-green transition-colors font-medium text-slate-700"
                  >
                    Mobiles
                  </Link>
                  <Link
                    to="/category/Electronics"
                    className="px-4 py-2 hover:bg-slate-50 rounded-lg hover:text-shopcart-green transition-colors font-medium text-slate-700"
                  >
                    Electronics
                  </Link>
                  <Link
                    to="/category/HomeandKitchen"
                    className="px-4 py-2 hover:bg-slate-50 rounded-lg hover:text-shopcart-green transition-colors font-medium text-slate-700"
                  >
                    Home & Kitchen
                  </Link>
                  <Link
                    to="/category/Beauty"
                    className="px-4 py-2 hover:bg-slate-50 rounded-lg hover:text-shopcart-green transition-colors font-medium text-slate-700"
                  >
                    Beauty
                  </Link>
                  <Link
                    to="/category/Appliances"
                    className="px-4 py-2 hover:bg-slate-50 rounded-lg hover:text-shopcart-green transition-colors font-medium text-slate-700"
                  >
                    Appliances
                  </Link>
                </div>
                <div className="bg-slate-50 p-2 border-t border-slate-100">
                  <Link
                    to="/products"
                    className="block w-full text-center bg-shopcart-dark text-white py-2.5 rounded-xl font-semibold hover:bg-shopcart-green transition-colors"
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            </div>
            <Link
              to="/"
              className="hover:text-shopcart-green transition-colors py-2"
            >
              Deals
            </Link>
            <Link
              to="/"
              className="hover:text-shopcart-green transition-colors py-2"
            >
              What's New
            </Link>
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-shopcart-green transition-colors py-2">
              <span>Company</span>
              <ChevronDownIcon className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-300" />

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden transform translate-y-2 group-hover:translate-y-0">
                <div className="p-2 flex flex-col">
                  <Link
                    to="/about-contact"
                    className="px-4 py-2 hover:bg-slate-50 rounded-lg hover:text-shopcart-green transition-colors font-medium text-slate-700"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/about-contact"
                    className="px-4 py-2 hover:bg-slate-50 rounded-lg hover:text-shopcart-green transition-colors font-medium text-slate-700"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md relative items-center"
          >
            <input
              className="w-full bg-shopcart-gray text-sm rounded-full py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-shopcart-green"
              placeholder="Search Product"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
            <button
              type="submit"
              className="absolute right-3 text-gray-500 hover:text-shopcart-green"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
            
            {/* Auto-suggest dropdown */}
            {isSearchFocused && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                {allProducts
                  .filter(p => p.title?.toLowerCase().includes(searchQuery.toLowerCase()))
                  .slice(0, 5)
                  .map(product => (
                    <div 
                      key={product._id}
                      onClick={() => {
                        setSearchQuery("");
                        navigate(`/product/${product._id}`);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0"
                    >
                      <img src={product.image?.url} alt={product.title} className="w-10 h-10 object-cover rounded" />
                      <div>
                        <div className="text-sm font-semibold text-slate-800 line-clamp-1">{product.title}</div>
                        <div className="text-xs text-slate-500">₹{product.price}</div>
                      </div>
                    </div>
                ))}
                {allProducts.filter(p => p.title?.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                  <div className="p-4 text-sm text-slate-500 text-center">No products found</div>
                )}
              </div>
            )}
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            {authenticated ? (
              <div className="flex items-center gap-4">
                <div className="relative group cursor-pointer flex items-center gap-1 text-gray-700 font-medium py-2">
                  <UserIcon className="h-6 w-6" />
                  <span className="hidden sm:inline">
                    {userName || "Account"}
                  </span>
                  <ChevronDownIcon className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-300" />

                  {/* Profile Dropdown */}
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-2 flex flex-col">
                      <Link
                        to="/profile"
                        className="px-4 py-2 hover:bg-slate-50 rounded-lg hover:text-shopcart-green transition-colors font-medium text-slate-700"
                      >
                        Profile Details
                      </Link>
                      <Link
                        to="/profile"
                        className="px-4 py-2 hover:bg-slate-50 rounded-lg hover:text-shopcart-green transition-colors font-medium text-slate-700"
                      >
                        Your Orders
                      </Link>
                      <button
                        onClick={tokenRelease}
                        className="text-left px-4 py-2 hover:bg-slate-50 rounded-lg hover:text-red-500 transition-colors font-medium text-slate-700"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/users/signin"
                className="flex items-center gap-2 text-gray-700 hover:text-shopcart-green font-medium"
              >
                <UserIcon className="h-6 w-6" />
                <span className="hidden sm:inline">Account</span>
              </Link>
            )}

            <Link
              to="/wishlist"
              className="flex items-center gap-2 text-gray-700 hover:text-shopcart-green font-medium"
            >
              <HeartIcon className="h-6 w-6" />
              <span className="hidden sm:inline">Wishlist</span>
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-2 text-gray-700 hover:text-shopcart-green font-medium"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="hidden sm:inline">Cart</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden block">
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  variant="ghost"
                />
                <MenuList className="p-2 shadow-lg rounded-xl border-shopcart-border">
                  <MenuItem className="rounded-md">
                    <Link to="/">Categories</Link>
                  </MenuItem>
                  <MenuItem className="rounded-md">
                    <Link to="/">Deals</Link>
                  </MenuItem>
                  <MenuItem className="rounded-md">
                    <Link to="/orders">My Orders</Link>
                  </MenuItem>
                  {authenticated ? (
                    <MenuItem className="rounded-md" onClick={tokenRelease}>
                      Logout
                    </MenuItem>
                  ) : (
                    <MenuItem className="rounded-md">
                      <Link to="/users/signin">Login</Link>
                    </MenuItem>
                  )}
                  <MenuItem className="rounded-md text-shopcart-green font-semibold mt-2 border-t border-shopcart-border">
                    <Link to="/admin/signin">Admin Dashboard</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
