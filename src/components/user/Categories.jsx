import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Categories = () => {
    // Original Categories mapped to premium lifestyle images
    const navCats = [     
      { path: "/category/Women", value: "Women", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80" },
      { path: "/category/Men", value: "Men", image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=400&q=80" },
      { path: "/category/Kids", value: "Kids", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=400&q=80" },
      { path: "/category/Mobiles", value: "Mobiles", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80" },
      { path: "/category/Electronics", value: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=400&q=80" },
      { path: "/category/HomeandKitchen", value: "Home & Kitchen", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80" },
      { path: "/category/Beauty ", value: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&w=400&q=80" },
      { path: "/category/Appliances", value: "Appliances", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80" },
    ];
    
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-6">
      
      {/* Popular Categories Section */}
      <h2 className="text-2xl font-bold text-shopcart-dark mb-8 text-center md:text-left">Popular Categories</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-8 justify-items-center pb-6">
        {navCats.map((cat, index) => (
          <Link key={index} to={cat.path} className="flex flex-col items-center gap-4 group w-full">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-300 ring-4 ring-transparent group-hover:ring-shopcart-green/20 transform group-hover:-translate-y-2">
              <img src={cat.image} alt={cat.value} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <span className="text-xs sm:text-sm md:text-base font-bold text-slate-700 group-hover:text-shopcart-green transition-colors text-center">{cat.value}</span>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-slate-200 my-8"></div>

      {/* Products Section Header with Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl font-extrabold text-shopcart-dark">Products For You!</h2>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-shopcart-gray text-gray-700 font-medium px-4 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm border border-transparent">
            All Filters <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
          </button>
          <button className="flex items-center gap-2 bg-white text-gray-700 font-medium px-5 py-2 rounded-full hover:bg-shopcart-gray transition-colors text-sm border border-shopcart-border shadow-sm">
            Sort by <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

    </div>
  );
}

export default Categories;