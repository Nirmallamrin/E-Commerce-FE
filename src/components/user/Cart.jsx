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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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
    <div className=" flex mt-5">
      <div className="flex-1">
        <h2 className="text-xl font-bold flex justify-center mb-4">
          Shopping Cart
        </h2>
        {cart.map((item) => (
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
                <Text py="2">Price: INR {item.price * quantities[item._id]}</Text>
              </CardBody>
              <div className="flex items-center">
                <div className="flex gap-2 bg-slate-100   p-2 rounded-md mx-2">
                  <h5>Qty</h5>
                  <button
                    className="font-bold "
                    onClick={() => handleQtyChange(item._id, "decrement")}
                  >
                    -
                  </button>
                  <p>{quantities[item._id]}</p>
                  <button
                    className="font-bold "
                    onClick={() => handleQtyChange(item._id, "increment")}
                  >
                    +
                  </button>
                </div>
              </div>

              <CardFooter className="gap-2">
                <Button
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => dispatch(removeFromCart(item._id))}
                >
                  Remove from cart
                </Button>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => handlePlaceOrder(item)}
                >
                  Buy Now
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        ))}
      </div>

      <div className="flex-1 ml-4">
        <h2 className="text-xl font-bold flex justify-center mb-4">
          Price Details
        </h2>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Price ({totalItems} items)</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount</span>
            <span>− ₹0</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery Charges</span>
            <span>₹0 (Free)</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Secured Packaging Fee</span>
            <span>₹99</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between mt-2 font-semibold">
            <span>Total Amount</span>
            <span>₹{totalPrice + 99}</span>
          </div>
          <div className="flex justify-center items-center">
          <button className="bg-cyan-300 p-2 rounded" onClick={handleProceed}>Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
