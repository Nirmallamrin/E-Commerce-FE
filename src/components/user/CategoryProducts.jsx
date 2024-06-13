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
                const res = await axios.get(`http://localhost:3000/api/v1/products?category=${categoryName}`)
                setProducts(res.data)
            } catch (error) {
               console.log("Error in fetching products", error) 
            }
        };
        fetchProducts();
    },[categoryName])
  return (
    <div>
    <h1 className="text-center text-2xl font-bold my-6">{categoryName} Products</h1>
    <div className="flex flex-wrap justify-center gap-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  </div>
  )
}

export default CategoryProducts