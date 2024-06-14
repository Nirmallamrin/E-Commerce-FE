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


const ProductCard = ({ product }) => {
  
  return (
            <Card maxW="sm" >
              <CardBody>
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={product.image.url}
                  alt={product.title}
                  borderRadius="lg"
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
         
  );
};

export default ProductCard;
