import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";

const schema = yup
  .object({
    title: yup.string().required(),
    price: yup.string().required(),
    image: yup.mixed().required(),
    category: yup.string().required(),
  })
  .required();

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const requestBody = {
      title: data.title,
      price: data.price,
      image: data.image[0],
      category:data.category,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/product/admin/products/new",
        requestBody,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Successfully Added")
      console.log(res.data);
    } catch (error) {
      console.error('There was an error creating the product!', error);
      alert('Failed to add product');
    }
  };
  
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2 rounded-md border p-6">
      
        <input {...register("title")} type="text" placeholder="title" />
        {errors.title && <p>{errors.title.message}</p>}

        <input {...register("price")} type="text" placeholder="price" />
        {errors.title && <p>{errors.price.message}</p>}
        <input {...register("image")} type="file" />
        {errors.image && <p>{errors.image.message}</p>}
     
        <select {...register("category")} defaultValue="">
          <option value="" disabled>
            Select a Category
          </option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">kids</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Electronics">Electronics</option>
          <option value="HomeandKitchen">Home & Kitchen</option>
          <option value="Beauty">Beauty Products</option>
          <option value="Appliances">Appliances</option>
        </select>
        <button  className="rounded-md bg-blue-500 p-1 text-white">
        Create New
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
