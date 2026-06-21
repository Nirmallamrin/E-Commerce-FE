import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../user/ProductCard';
import { Link } from 'react-router-dom';

const PopularProducts = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/product/products`);
        // Just take the first 8 products to simulate "popular"
        setPopularProducts(res.data.slice(0, 8));
      } catch (error) {
        console.error("Error in fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-16 bg-slate-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-shopcart-green"></div>
      </div>
    );
  }

  return (
    <div className="w-full py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">Trending Now</h2>
            <p className="text-slate-500">Discover our most popular products this week.</p>
          </div>
          <Link to="/products" className="hidden sm:inline-block text-shopcart-green font-semibold hover:text-shopcart-dark transition-colors">
            View All Collection &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        
        <div className="mt-10 text-center sm:hidden">
          <Link to="/products" className="inline-block px-6 py-3 bg-shopcart-green text-white font-bold rounded-xl shadow-lg hover:bg-shopcart-dark transition-all">
            View All Collection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;
