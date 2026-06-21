import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions/CartActions";
import {
  Card,
  CardBody,
  Text,
  Button,
  Image,
  Stack,
  Heading,
  CardFooter,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/outline";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialQuantities = cart.reduce((acc, item) => {
    acc[item._id] = 1;
    return acc;
  }, {});

  const [quantities, setQuantities] = useState(initialQuantities);

  const handleQtyChange = (itemId, operation) => {
    setQuantities((prevQuantities) => {
      const newQty = operation === "increment" ? prevQuantities[itemId] + 1 : prevQuantities[itemId] - 1;
      return {
        ...prevQuantities,
        [itemId]: newQty > 0 ? newQty : 1,
      };
    });
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * quantities[item._id], 0);
  const totalItems = cart.length;

  const handlePlaceOrder = (product) => {
    navigate("/order", { state: { product } });
  };

  const handleProceed = () => {
    navigate("/cartcheckout", { state: { cart, totalPrice: totalPrice + 99 } });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      <div className="flex-[2]">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
          <ShoppingCartIcon className="h-6 w-6 mr-2 text-cyan-500" />
          Shopping Cart ({totalItems} items)
        </h2>
        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center text-slate-500">
            Your cart is empty.
          </div>
        ) : (
          cart.map((item) => (
            <Card
              key={item._id}
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              className="mb-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl border-slate-100"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src={item.image.url}
                alt={item.title}
                className="bg-slate-50"
              />

              <Stack flex="1">
                <CardBody>
                  <Heading size="md" className="text-slate-800">{item.title}</Heading>

                  <Text py="2" className="text-slate-500 line-clamp-2">{item.description}</Text>
                  <Text py="2" className="text-xl font-bold text-cyan-600">₹ {item.price * quantities[item._id]}</Text>
                </CardBody>
                <Box className="flex items-center px-4 pb-2">
                  <Box className="flex gap-3 bg-slate-50 border border-slate-200 p-1.5 rounded-full items-center">
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-slate-100 text-slate-700 font-bold transition-colors"
                      onClick={() => handleQtyChange(item._id, "decrement")}
                    >
                      -
                    </button>
                    <Text fontSize="md" fontWeight="semibold" className="w-4 text-center">{quantities[item._id]}</Text>
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-slate-100 text-slate-700 font-bold transition-colors"
                      onClick={() => handleQtyChange(item._id, "increment")}
                    >
                      +
                    </button>
                  </Box>
                </Box>

                <CardFooter className="gap-3 pt-0">
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-200 text-slate-600 hover:bg-slate-50"
                    onClick={() => dispatch(removeFromCart(item._id))}
                  >
                    Remove
                  </Button>
                  <Button
                    className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all border-none"
                    onClick={() => handlePlaceOrder(item)}
                  >
                    Buy Now
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
          ))
        )}
      </div>

      <div className="flex-1">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Order Summary
        </h2>
        <div className="bg-white shadow-xl shadow-slate-200/50 p-6 rounded-2xl border border-slate-100 sticky top-24">
          <div className="space-y-4 text-slate-600">
            <div className="flex justify-between">
              <span>Price ({totalItems} items)</span>
              <span className="font-medium text-slate-800">₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-500 font-medium">− ₹0</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-500 font-medium">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Secured Packaging Fee</span>
              <span className="font-medium text-slate-800">₹99</span>
            </div>
            
            <div className="border-t border-slate-100 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-800">Total Amount</span>
                <span className="text-2xl font-extrabold text-cyan-600">₹{totalPrice + 99}</span>
              </div>
            </div>
          </div>
          
          <button 
            className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300" 
            onClick={handleProceed}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
