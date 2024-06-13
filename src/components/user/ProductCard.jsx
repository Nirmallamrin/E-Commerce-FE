import React from "react";
import  { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CategoryProducts from "./CategoryProducts";

const ProductCard = ({ product }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/product/products"
        );
        const data = await res.data;
        console.log("product", data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProduct;
  }, []);
  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //   {products &&
    //     products.map((product, index) => (
    //       <div key={index}>
            <Card maxW="sm">
              <CardBody>
                <Image
                  src={product.image.url}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{product.title}</Heading>
                  <Text>{product.description}</Text>

                  <Text color="blue.600" fontSize="2xl">
                    {product.price}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="solid" colorScheme="blue">
                    Buy now
                  </Button>
                  <Button variant="ghost" colorScheme="blue">
                    Add to cart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          // </div>
    //     ))}
    // </div>
  );
};

export default ProductCard;
