import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Stack,
  CardBody,
  Heading,
  Button,
  Image,
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaIndianRupeeSign } from "react-icons/fa6";


const Order = () => {
  
  const navigate = useNavigate()
  
  const location = useLocation();
  const { product } = location.state || {};
  const [shippingAddress, setShippingAddress] = useState({
    email:"",
    phonenumber:"",
    address: "",
    city: "",
    pincode: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleOrder = async () => {
    const token = sessionStorage.getItem('userToken');
    console.log("Retrieved token:", token);
    if (!token) {
      toast.error("Please sign in to place an order.");
      navigate('/users/signin');
      return;
    }

    try {
      const res = await axios.post(
        "https://e-commerce-be-yi97.onrender.com/order/new",
        {
          shippingAddress,
          orderItems: [
            {
              title: product.title,             
              image: product.image.url,
              price: product.price,
              product: product._id,
            },
          ],
          paymentMethod: "Credit Card",
          totalPrice: product.price,
        },
 

      );
      
      if (res.status === 201) {
        toast.success("Order created successfully!");
        navigate("/payment",{state: {orderDetails: res.data}})
      } else {
        toast.error("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("An error occurred while creating the order.");
    }
  };

  if (!product) {
    return <div>No product information available.</div>;
  }


  return (
    <>
      <div className="flex justify-center items-center p-4 bg-gray-100">
        <Card
          direction={{ base: "column", md: "row" }}
          overflow="hidden"
          variant="outline"
          className="w-full max-w-screen-lg rounded-lg shadow-lg bg-white"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", md: "350px" }}
            src={product.image.url}
            alt={product.title}
          />
          <Stack spacing={4} p={4} className="flex flex-col justify-between">
            <CardBody>
              <Heading size="md">{product.title}</Heading>
              <Text py="2" className="mt-2">
                {product.description}
              </Text>
              <Text py="2" className="flex items-center">
                <FaIndianRupeeSign className="mr-0" />
                {product.price}
              </Text>
              
                <div className="flex items-center">
                <div className="flex gap-2 bg-blue-200 p-1 rounded-md">
                  <h5>Qty</h5>
                  <button className="font-bold ">-</button>
                  <p>1</p>
                  <button className="font-bold ">+</button>
                </div>
                </div>
              
            </CardBody>
          </Stack>
        </Card>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Delivery Address</h2>
        
        <FormControl>
          <FormLabel>Phone No</FormLabel>
          <Input
            type="number"
            name="phonenumber"
            value={shippingAddress.phonenumber}
            onChange={handleInputChange}
          />
          <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={shippingAddress.email}
            onChange={handleInputChange}
          />
        </FormControl>
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            name="address"
            value={shippingAddress.address}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>City</FormLabel>
          <Input
            type="text"
            name="city"
            value={shippingAddress.city}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Pin Code</FormLabel>
          <Input
            type="text"
            name="pincode"
            value={shippingAddress.pincode}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Country</FormLabel>
          <Input
            type="text"
            name="country"
            value={shippingAddress.country}
            onChange={handleInputChange}
          />
        </FormControl>

        <Button
          variant="solid"
          colorScheme="blue"
          onClick={handleOrder}
          className="mt-4"
        >
          Place Order
        </Button>
      </div>
    </>
  );
};

export default Order;