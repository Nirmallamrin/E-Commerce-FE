import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/CartActions";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/WishlistActions";
import { toast } from "react-toastify";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import axios from "axios";

const ProductCard = ({product}) => {  
  const dispatch = useDispatch();  
  const navigate = useNavigate();
  
  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);
  const isWishlisted = wishlistItems.some(item => item._id === product._id);

  const handleViewClick = ()=> {   
      navigate(`/product/${product._id}`);
  }    

  const handleAddToCart = (e) => {
    e.stopPropagation(); // prevent clicking the card from firing
    const token = sessionStorage.getItem('userToken');
    if (!token) {
      toast.error("You need to sign in first.");
      navigate("/users/signin"); 
      return;
    }
    dispatch(addToCart(product))
    toast.success("Product added to cart!");
  }

  const handleAddToWishlist = async (e) => {
    e.stopPropagation();
    const token = sessionStorage.getItem('userToken');
    if (!token) {
      toast.error("You need to sign in first.");
      navigate("/users/signin"); 
      return;
    }
    
    try {
      if (!isWishlisted) {
        dispatch(addToWishlist(product));
        toast.success("Added to Wishlist!");
        await axios.post(`${window.API_URL}/wishlist/add`, { productId: product._id }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        dispatch(removeFromWishlist(product));
        toast.info("Removed from Wishlist");
        await axios.post(`${window.API_URL}/wishlist/remove`, { productId: product._id }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error("Failed to update wishlist in DB", error);
    }
  }

  return (
    <div 
      className="bg-white border border-slate-100 rounded-2xl flex flex-col relative group cursor-pointer transition-all duration-300 hover:shadow-xl overflow-hidden h-full"
      onClick={handleViewClick}
    >
      {/* Floating Action Icons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 transition-all duration-300">
        <button 
          onClick={handleAddToWishlist}
          className="bg-white p-2.5 rounded-full shadow-md hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
          title="Wishlist"
        >
          {isWishlisted ? (
            <HeartIconSolid className="w-5 h-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5 h-5" />
          )}
        </button>
        <button 
          onClick={handleAddToCart}
          className="bg-white p-2.5 rounded-full shadow-md hover:bg-shopcart-green text-slate-400 hover:text-white transition-colors"
          title="Add to Cart"
        >
          <ShoppingCartIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Image */}
      <div className="w-full aspect-square bg-slate-50 relative overflow-hidden flex items-center justify-center p-4">
        <img          
          src={product.image?.url || '/path/to/default-image.jpg'}
          alt={product.title || 'Product Image'}
          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow bg-white">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-bold text-shopcart-dark text-lg line-clamp-1">{product.title}</h3>
          <span className="font-bold text-shopcart-dark text-lg whitespace-nowrap">
            ₹{product.price ? product.price : 'N/A'}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description || 'No description available'}
        </p>
        
        {/* Rating Placeholder */}
        <div className="flex items-center gap-1 mt-auto">
          {[1,2,3,4,5].map(star => (
            <svg key={star} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-slate-400 text-xs font-medium ml-1">(121)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
