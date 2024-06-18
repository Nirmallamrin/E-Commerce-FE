import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Image,
  Text
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";



const AllProducts = () => {  

  const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const getAllProducts = async () => {
        try {
          const res = await axios.get(
            " http://localhost:3000/api/v1/product/products ",
          );
          const data = await res.data;
          console.log("course", data);
          setProducts(data);
        } catch (error) {
          console.log(error);
        }
      };
      getAllProducts();
    }, []);

  return (
    <main className="flex flex-wrap gap-6 justify-center p-6">
    
    {products && 
       products.map((product, index) => (
        <div key={index}>
            <Card maxW="sm" className="w-64">
              
              <CardBody>
                <Image
                 
                  maxW={{ base: "100%", sm: "200px" }}
                  src={product.image.url}
                  alt={product.title}
                  borderRadius="lg"
                  className="w-full h-48 object-cover"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{product.title}</Heading>
                  

                  <Text color="blue.600" fontSize="">
                   INR {product.price}
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
            </div>
         ))}
       </main>  
  );
};

export default AllProducts;
