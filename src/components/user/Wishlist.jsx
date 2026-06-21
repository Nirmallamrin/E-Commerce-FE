import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl min-h-[60vh]">
            <h1 className="text-3xl font-extrabold text-shopcart-dark mb-8">My Wishlist</h1>
            {wishlistItems.length === 0 ? (
                <div className="text-center text-slate-500 py-12 flex flex-col items-center">
                    <p className="mb-6 text-lg">Your wishlist is currently empty.</p>
                    <Link to="/products" className="bg-shopcart-dark text-white px-8 py-3 rounded-xl font-bold hover:bg-shopcart-green transition-colors">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlistItems.map((product) => (
                        <div key={product._id} className="relative">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Wishlist;
