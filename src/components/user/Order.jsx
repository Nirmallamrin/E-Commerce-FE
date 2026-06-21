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
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaIndianRupeeSign } from "react-icons/fa6";

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};
  const [shippingAddress, setShippingAddress] = useState({
    email: "",
    phonenumber: "",
    address: "",
    city: "",
    pincode: "",
    country: "",
  });
  const [qty, setQty] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleQtyChange = (operataion) => {
    setQty((prevQty) => {
      const newQty = operataion === "increment" ? prevQty + 1 : prevQty - 1;
      return newQty > 0 ? newQty : 1;
    });
  };

  const handleOrder = async () => {
    const token = sessionStorage.getItem("userToken");
    console.log("Retrieved token:", token);

    if (!token) {
      toast.error("Please sign in to place an order.");
      navigate("/users/signin");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/order/new",
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
          totalPrice: product.price * qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success("Order created successfully!");
        navigate("/payment", { state: { orderDetails: res.data } });
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
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col-reverse lg:flex-row gap-8">
      {/* Form Section */}
      <div className="flex-[2] bg-white shadow-xl shadow-slate-200/50 p-8 rounded-2xl border border-slate-100">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-8 tracking-tight">Delivery Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormControl>
            <FormLabel className="text-slate-600 font-semibold">Phone Number</FormLabel>
            <Input
              type="number"
              name="phonenumber"
              value={shippingAddress.phonenumber}
              onChange={handleInputChange}
              className="border-slate-200 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
              placeholder="Enter phone number"
            />
          </FormControl>
          <FormControl>
            <FormLabel className="text-slate-600 font-semibold">Email Address</FormLabel>
            <Input
              type="email"
              name="email"
              value={shippingAddress.email}
              onChange={handleInputChange}
              className="border-slate-200 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
              placeholder="Enter email address"
            />
          </FormControl>
          <FormControl className="md:col-span-2">
            <FormLabel className="text-slate-600 font-semibold">Complete Address</FormLabel>
            <Input
              type="text"
              name="address"
              value={shippingAddress.address}
              onChange={handleInputChange}
              className="border-slate-200 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
              placeholder="Street, Apartment, suite, etc."
            />
          </FormControl>
          <FormControl>
            <FormLabel className="text-slate-600 font-semibold">City</FormLabel>
            <Input
              type="text"
              name="city"
              value={shippingAddress.city}
              onChange={handleInputChange}
              className="border-slate-200 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
              placeholder="City name"
            />
          </FormControl>
          <FormControl>
            <FormLabel className="text-slate-600 font-semibold">Pin Code</FormLabel>
            <Input
              type="text"
              name="pincode"
              value={shippingAddress.pincode}
              onChange={handleInputChange}
              className="border-slate-200 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
              placeholder="Postal code"
            />
          </FormControl>
          <FormControl className="md:col-span-2">
            <FormLabel className="text-slate-600 font-semibold">Country</FormLabel>
            <Input
              type="text"
              name="country"
              value={shippingAddress.country}
              onChange={handleInputChange}
              className="border-slate-200 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
              placeholder="Country name"
            />
          </FormControl>
        </div>

        <button
          onClick={handleOrder}
          className="w-full mt-10 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300"
        >
          Proceed to Payment
        </button>
      </div>

      {/* Product Summary Section */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Order Summary
        </h2>
        <div className="sticky top-24">
          <Card
            direction="column"
            overflow="hidden"
            variant="outline"
            className="w-full rounded-2xl shadow-xl shadow-slate-200/50 bg-white border-slate-100"
          >
            <Image
              objectFit="cover"
              maxH="250px"
              width="100%"
              src={product.image.url}
              alt={product.title}
              className="bg-slate-50"
            />
            <Stack spacing={0} p={6} className="flex flex-col justify-between">
              <CardBody className="p-0">
                <Heading size="md" className="text-slate-800 mb-2">{product.title}</Heading>
                <Text py="2" className="text-slate-500 line-clamp-2 mb-4 text-sm">
                  {product.description}
                </Text>
                
                <Box className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                  <Box className="flex gap-3 bg-slate-50 border border-slate-200 p-1 rounded-full items-center">
                    <button
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-slate-100 text-slate-700 font-bold transition-colors"
                      onClick={() => handleQtyChange( "decrement")}
                    >
                      -
                    </button>
                    <Text fontSize="md" fontWeight="semibold" className="w-4 text-center">{qty}</Text>
                    <button
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-slate-100 text-slate-700 font-bold transition-colors"
                      onClick={() => handleQtyChange( "increment")}
                    >
                      +
                    </button>
                  </Box>
                  <Text className="flex items-center text-xl font-bold text-cyan-600">
                    <FaIndianRupeeSign className="mr-1 text-lg" />
                    {product.price * qty}
                  </Text>
                </Box>
                
                <div className="space-y-3 text-slate-600 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-800">₹{product.price * qty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-500 font-medium">Free</span>
                  </div>
                </div>
              </CardBody>
            </Stack>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Order;
