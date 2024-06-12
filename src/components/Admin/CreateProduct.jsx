import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import axios from "axios";

const schema = yup.object({
    title: yup.string().required(),
    description:yup.string().required(),
    price: yup.string().required(),
    image: yup.mixed().required(),
    category:yup.string().required()
}).required();



const CreateProduct = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ resolver: yupResolver(schema) });
    
    
    const onSubmit = async (data) => {
      const requestBody = {
        title: data.title,
        description:data.description,
        price:data.price,
        image: data.image
      };
      try {
        const res = await axios.post ("http://localhost:3000/api/v1/product/admin/products/new",
          requestBody,
          {
          withCredentials: true,
          headers: {
            "Content-Type":"multipart/form-data",
          },
          },
        );
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }

    }
    
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
        <form onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-y-2 rounded-md border p-6'>
            <input {...register("title")}
            type="text"
            placeholder='title' />

             <input {...register("description")}
            type="text"
            placeholder='description' />

             <input {...register("price")}
            type="text"
            placeholder='price' />

            <input {...register("image")}
            type="file" />

            <select {...register("category")}>
                <option value="" disabled selected>Select a category</option>
                <option value="Men">Men</option>
                <option value="Men">Women</option>
                <option value="Men">kids</option>
                <option value="Men">Home & Kitchen</option>
                <option value="Men">Accessories</option>
                <option value="Men">Electronics</option>
            </select>
            <input type='submit'
            className="rounded-md bg-blue-500 p-1 text-white"/>
        </form>
        
    </div>
  )
}

export default CreateProduct