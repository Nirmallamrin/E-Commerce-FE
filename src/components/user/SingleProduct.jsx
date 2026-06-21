import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/CartActions";
import { toast } from "react-toastify";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import {
  ShieldCheckIcon,
  TruckIcon,
  RefreshIcon,
  ClockIcon,
} from "@heroicons/react/outline";
import { ShoppingCartIcon, LightningBoltIcon } from "@heroicons/react/solid";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", comment: "", rating: 5 });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${window.API_URL}/product/products/${id}`
        );
        setProduct(res.data);
        setLoading(false);

        // Dummy reviews for demonstration
        setReviews([
          { name: "Emily Chen", comment: "Absolutely love this! The quality exceeded my expectations.", rating: 5 },
          { name: "Michael R.", comment: "Good value for money. Shipping was fast.", rating: 4 },
        ]);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-shopcart-green"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops! Something went wrong.</h2>
          <p className="text-slate-500">We couldn't load the product details. Please try again later.</p>
          <button 
            onClick={() => navigate('/products')}
            className="mt-6 px-6 py-2 bg-shopcart-green text-white rounded-full hover:bg-shopcart-dark transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const token = sessionStorage.getItem("userToken");
    if (!token) {
      toast.error("Please sign in to add items to your cart.");
      navigate("/users/signin");
      return;
    }
    // Assume addToCart takes qty as well, but existing implementation might just take product
    for(let i=0; i<qty; i++){
        dispatch(addToCart(product));
    }
    toast.success(`${qty} item(s) added to cart!`);
  };

  const handleBuyNow = () => {
    const token = sessionStorage.getItem("userToken");
    if (!token) {
      toast.error("Please sign in to complete your purchase.");
      navigate("/users/signin");
    } else {
      navigate("/order", { state: { product, quantity: qty } });
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if(!newReview.name || !newReview.comment) {
        toast.error("Please fill in all fields");
        return;
    }
    setReviews([newReview, ...reviews]);
    setNewReview({ name: "", comment: "", rating: 5 });
    toast.success("Thank you for your review!");
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-slate-500 mb-8 space-x-2">
          <span onClick={() => navigate('/')} className="cursor-pointer hover:text-shopcart-green transition-colors">Home</span>
          <span>/</span>
          <span onClick={() => navigate('/products')} className="cursor-pointer hover:text-shopcart-green transition-colors">Products</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">{product.category}</span>
        </div>

        {/* Product Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-10 mb-12 border border-slate-100">
          
          {/* Left: Image Gallery */}
          <div className="flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-8 border border-slate-100">
            <img
              src={product.image?.url}
              alt={product.title}
              className="w-full max-w-md object-contain rounded-xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-2 flex items-center justify-between">
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                In Stock
                </span>
                <div className="flex items-center text-yellow-400 text-sm">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar className="text-yellow-200" />
                    <span className="text-slate-500 ml-2 font-medium">({reviews.length} Reviews)</span>
                </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
              {product.title}
            </h1>
            
            <div className="flex items-end mb-6">
              <span className="text-4xl font-black text-cyan-600 flex items-center">
                <FaIndianRupeeSign className="text-3xl mr-1" />
                {product.price}
              </span>
              <span className="text-slate-400 line-through ml-3 text-lg mb-1 font-medium flex items-center">
                <FaIndianRupeeSign className="text-base" />
                {Math.round(product.price * 1.4)}
              </span>
              <span className="text-green-500 font-bold ml-4 mb-1 text-sm bg-green-50 px-2 py-0.5 rounded">
                Save 40%
              </span>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="mb-8">
              <span className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Quantity</span>
              <div className="flex items-center w-32 bg-slate-100 rounded-full p-1 border border-slate-200">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-600 hover:text-cyan-600 shadow-sm transition-colors font-bold text-lg"
                >
                  -
                </button>
                <span className="flex-1 text-center font-bold text-slate-800">{qty}</span>
                <button 
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-600 hover:text-cyan-600 shadow-sm transition-colors font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-300"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                <LightningBoltIcon className="w-5 h-5" />
                Buy Now
              </button>
            </div>
            
            {/* Features list */}
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-3 text-slate-600">
                    <div className="bg-cyan-50 p-2 rounded-full text-cyan-600"><TruckIcon className="w-5 h-5" /></div>
                    <span className="text-sm font-medium">Free Delivery</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                    <div className="bg-cyan-50 p-2 rounded-full text-cyan-600"><RefreshIcon className="w-5 h-5" /></div>
                    <span className="text-sm font-medium">30 Days Return</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                    <div className="bg-cyan-50 p-2 rounded-full text-cyan-600"><ShieldCheckIcon className="w-5 h-5" /></div>
                    <span className="text-sm font-medium">Secure Payment</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                    <div className="bg-cyan-50 p-2 rounded-full text-cyan-600"><ClockIcon className="w-5 h-5" /></div>
                    <span className="text-sm font-medium">24/7 Support</span>
                </div>
            </div>

          </div>
        </div>

        {/* Product Details & Reviews Tabs layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
                {/* Description details */}
                <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/40 p-8 border border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                        <span className="bg-cyan-500 w-1.5 h-6 rounded-full mr-3"></span>
                        Product Specifications
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        Experience the perfect blend of innovation and craftsmanship. This premium {product.category.toLowerCase()} is designed with the modern user in mind, utilizing high-grade materials to ensure longevity and superior performance. Whether you're upgrading your daily routine or looking for the perfect gift, this product delivers unmatched value.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <ShieldCheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-slate-700"><strong className="text-slate-900">Premium Quality:</strong> Built with industry-leading materials ensuring maximum durability.</span>
                        </li>
                        <li className="flex items-start">
                            <ShieldCheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-slate-700"><strong className="text-slate-900">Modern Design:</strong> Sleek aesthetics that seamlessly blend into your lifestyle.</span>
                        </li>
                        <li className="flex items-start">
                            <ShieldCheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-slate-700"><strong className="text-slate-900">Certified Authentic:</strong> 100% genuine product sourced directly from the manufacturer.</span>
                        </li>
                        <li className="flex items-start">
                            <ShieldCheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-slate-700"><strong className="text-slate-900">Warranty Included:</strong> Comes with a standard 1-year comprehensive manufacturer's warranty.</span>
                        </li>
                    </ul>
                </div>

                {/* Reviews List */}
                <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/40 p-8 border border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="bg-yellow-400 w-1.5 h-6 rounded-full mr-3"></span>
                            Customer Reviews
                        </div>
                        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{reviews.length} Reviews</span>
                    </h2>
                    
                    <div className="space-y-6">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div key={index} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 text-white flex items-center justify-center font-bold text-lg">
                                                {review.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">{review.name}</h4>
                                                <div className="flex text-yellow-400 text-xs mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        i < review.rating ? <FaStar key={i} /> : <FaRegStar key={i} className="text-slate-300" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-400 font-medium">Just now</span>
                                    </div>
                                    <p className="text-slate-600 mt-3 pl-13">{review.comment}</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-5xl mb-4">⭐</div>
                                <h3 className="text-lg font-bold text-slate-800 mb-1">No reviews yet</h3>
                                <p className="text-slate-500">Be the first to review this product!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar Area - Write a Review */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/40 p-8 border border-slate-100 sticky top-28">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Write a Review</h3>
                    <form onSubmit={handleReviewSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
                            <input
                                type="text"
                                value={newReview.name}
                                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 flex justify-between">
                                Rating
                                <span className="text-cyan-600">{newReview.rating} Stars</span>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={newReview.rating}
                                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                                className="w-full accent-cyan-500"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-1 px-1">
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Your Experience</label>
                            <textarea
                                value={newReview.comment}
                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all min-h-[120px] resize-y"
                                placeholder="What did you like or dislike?"
                                required
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-slate-900 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-slate-800 transition-colors shadow-md flex justify-center items-center gap-2"
                        >
                            <FaStar className="text-yellow-400" /> Submit Review
                        </button>
                    </form>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default SingleProduct;