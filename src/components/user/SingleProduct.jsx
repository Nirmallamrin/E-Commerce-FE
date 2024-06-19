import React, { useEffect, useState } from "react";
import { 
  Card, 
  Stack ,
  CardBody, 
  CardFooter,
  Heading,
  Button,
  Image,
  Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/product/products/${id}`
        );
        setProduct(res.data);
        setLoading(false);
        console.log(res.data)    
      } catch (error) {
        console.log(error);
        setError(error); 
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  return (
    <div>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={product.image.url}
          alt={product.title}
        />

        <Stack>
          <CardBody>
            <Heading size="md">{product.title}</Heading>

            <Text py="2">
              {product.description}
            </Text>
            <Text py="2">
            Price: INR {product.price}
            </Text>
          </CardBody>

          <CardFooter>
            <Button variant="solid" colorScheme="blue">
              Buy Now
            </Button>
            <Button variant="solid" colorScheme="blue">
              Add to Cart
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
};

export default SingleProduct;
