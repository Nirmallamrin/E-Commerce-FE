import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  ButtonGroup,
  Button,
  Image,
  Text
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';


const ProductCard = ({product}) => {  

  const navigate = useNavigate();

  const handleViewClick = ()=> {   
      navigate(`/product/${product._id}`);
  }    
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

          <Text color="black" >
            INR {product.price}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue' onClick={handleViewClick}>
        View
      </Button>
      <Button variant='ghost' colorScheme='blue' >
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
      
    </Card>
  );
};

export default ProductCard;
