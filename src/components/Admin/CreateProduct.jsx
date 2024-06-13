import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
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
      description: data.description,
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
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2 rounded-md border p-6"
      >
        <input {...register("title")} type="text" placeholder="title" />
         
        <input
          {...register("description")}
          type="text"
          placeholder="description"
        />

        <input {...register("price")} type="text" placeholder="price" />

        <input {...register("image")} type="file" />

        <select {...register("category")}>
          <option value="" disabled selected>
            Select a Category
          </option>
          <option value="Men">Men</option>
          <option value="Men">Women</option>
          <option value="Men">kids</option>
          <option value="Men">Mobiles</option>
          <option value="Men">Eletronics</option>
          <option value="Men">Home & Kitchen</option>
          <option value="Men">Beauty Products</option>
          <option value="Men">Appliances</option>
        </select>
        {/* <input
          type="submit"
          placeholder="Ada Product"
          className="rounded-md bg-blue-500 p-1 text-white"
        /> */}
        <button  className="rounded-md bg-blue-500 p-1 text-white">
        Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
