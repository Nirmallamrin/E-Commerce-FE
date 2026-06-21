import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useSearchParams } from 'react-router-dom';

const ShopProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filter & Sort State
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState(''); // 'asc' or 'desc'

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${window.API_URL}/product/products`);
                setProducts(res.data)
            } catch (error) {
               console.error("Error in fetching products", error) 
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    },[])

    const categories = useMemo(() => {
        const cats = products.map(p => p.category).filter(Boolean);
        return ['All', ...new Set(cats)];
    }, [products]);

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const displayedProducts = useMemo(() => {
        let filtered = [...products];

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p => 
                p.title?.toLowerCase().includes(query) || 
                p.description?.toLowerCase().includes(query)
            );
        }

        // Filter by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Sort by price (rate)
        if (sortOrder === 'asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            filtered.sort((a, b) => b.price - a.price);
        }

        return filtered;
    }, [products, selectedCategory, sortOrder, searchQuery]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-shopcart-green"></div>
            </div>
        );
    }

    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-shopcart-dark">All Products</h1>
            <p className="text-slate-500 font-medium mt-1">{displayedProducts.length} products found</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-slate-700">Category:</label>
                  <select 
                      className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-shopcart-green cursor-pointer"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                      {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                      ))}
                  </select>
              </div>

              {/* Sort by Price/Rate */}
              <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-slate-700">Sort by:</label>
                  <select 
                      className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-shopcart-green cursor-pointer"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                  >
                      <option value="">Default</option>
                      <option value="asc">Price: Low to High</option>
                      <option value="desc">Price: High to Low</option>
                  </select>
              </div>
          </div>
        </div>
        
        {displayedProducts.length === 0 ? (
            <div className="text-center text-slate-500 py-12">No products found matching your criteria.</div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <div key={product._id} className="flex-grow-0 flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
        )}
      </div>
    )
}

export default ShopProducts;
