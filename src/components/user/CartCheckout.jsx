import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Text,
  Button,
  Image,
  Stack,
  Heading,FormControl,FormLabel,Input
} from "@chakra-ui/react";

const CartCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };

  const [shippingAddress, setShippingAddress] = useState({
    email: "",
    phonenumber: "",
    address: "",
    city: "",
    pincode: "",
    country: "",
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handlePlaceOrder = () => {
    navigate("", { state: { cart, totalPrice, shippingAddress } });
  };



  return (
    <div className="flex mt-5">
      <div className="flex-1">
        <h2 className="text-xl font-bold flex justify-center mb-4">
          Checkout
        </h2>
        {Array.isArray(cart) && cart.map((item) => (
          <Card
            key={item._id}
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            className="mb-4"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src={item.image.url}
              alt={item.title}
            />

            <Stack>
              <CardBody>
                <Heading size="md">{item.title}</Heading>
                <Text py="2">{item.description}</Text>
                <Text py="2">Price: INR {item.price}</Text>
              </CardBody>
            </Stack>
          </Card>
        ))}
      </div>

      <div className="flex-1 ml-4">
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
        </div>
        <h2 className="text-xl font-bold flex justify-center mb-4">
          Order Summary
        </h2>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Total Amount</span>
            <span>&#8377;{totalPrice}</span>
          </div>
          <div className="flex justify-center items-center">
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;
