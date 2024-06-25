import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';


const CategoryProducts = () => {
    const {categoryName } = useParams();
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`https://e-commerce-be-yi97.onrender.com/product/products/getcategoryofproducts?category=${categoryName}`);
                const data = await res.data
                console.log(res.data)
                setProducts(data)
            } catch (error) {
               console.log("Error in fetching products", error) 
            }
        };
        fetchProducts();
    },[categoryName])


  return (
    <div className="container mx-auto p-4">
    <h1 className="text-center text-2xl font-bold my-6">{categoryName} Products</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product._id} className="flex-grow-0 flex-shrink-0 p-2">
        <ProductCard  product={product} />
        </div>
      ))}
    </div>
  </div>
  )
}

export default CategoryProducts