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




const ProductCard = ({product}) => {  
  return (        
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
              
              
            </Card>
         
  );
};

export default ProductCard;
