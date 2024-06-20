import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions/CartActions";
import { Card, CardBody,Text, Button,Image, Stack, Heading,CardFooter } from "@chakra-ui/react";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold flex justify-center " >Continue Shopping</h2>
      {cart.map((item) => (
       
        <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
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

            <Text py="2">
              {item.description}
            </Text>
            <Text py="2">
            Price: INR {item.price}
            </Text>
          </CardBody>

          <CardFooter className="gap-2">
            <Button variant="solid" colorScheme="blue" onClick={() => dispatch(removeFromCart(item._id))}>
              Remove from cart
            </Button>
            <Button variant="solid" colorScheme="blue">
              Place the order
            </Button>
          </CardFooter>
        </Stack>
      </Card>
      ))}
    </div>
  );
};

export default Cart;
