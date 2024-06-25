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
import { useDispatch} from "react-redux";
import { addToCart } from "../../redux/actions/CartActions";
import { toast } from "react-toastify";
import { FaIndianRupeeSign } from "react-icons/fa6";

const ProductCard = ({product}) => {  

  const dispatch = useDispatch();  
  const navigate = useNavigate();

  const handleViewClick = ()=> {   
      navigate(`/product/${product._id}`);
  }    

  const handleAddToCart = (product) => {
    
    const token = sessionStorage.getItem('userToken');
    if (!token) {
      toast.error("You need to sign in first.");
      navigate("/users/signin"); // Redirect to signin page if not authenticated
      return;
    }
    dispatch(addToCart(product))
    toast.success("Product added to cart!");
  }

  return (
    <Card maxW="sm" className="w-64">
      <CardBody>
        <Image          
          maxW={{ base: "100%", sm: "200px" }}
          src={product.image?.url || '/path/to/default-image.jpg'}
          alt={product.title || 'Product Image'}
          borderRadius="lg"
          className="w-full h-48 object-cover"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{product.title}</Heading>
          <Text color="black " >
             {product.description || 'No description available'}
          </Text>
          <Text py="2" className="flex items-center">
            <FaIndianRupeeSign className="mr-0"/>{product.price ? product.price : 'N/A'} 
            </Text>
        </Stack>
      </CardBody>
      <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue' onClick={handleViewClick}>
        View
      </Button>
      <Button variant='ghost' colorScheme='blue'  onClick={() => handleAddToCart(product)}>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
      
    </Card>
  );
};

export default ProductCard;
