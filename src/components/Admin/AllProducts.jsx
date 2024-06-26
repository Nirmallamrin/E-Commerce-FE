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
  Text,Input,useDisclosure,Modal, ModalOverlay,ModalContent, ModalHeader,ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AllProducts = () => {  

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedRatings, setUpdatedRatings] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

    useEffect(() => {
      const getAllProducts = async () => {
        try {
          const res = await axios.get(
            " https://e-commerce-be-yi97.onrender.com/product/products ",
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

    const handleDelete = async (productId) => {
      try {
        await axios.delete(`http://localhost:3000/api/v1/product/admin/delete/${productId}`)
        setProducts(products.filter(product => product._id !== productId));
      } catch (error) {
        console.log(error);
      }
    };

    const handleUpdate = (product) => {
      setSelectedProduct(product);
      setUpdatedTitle(product.title);
      setUpdatedDescription(product.description);
      setUpdatedPrice(product.price);
      
      setUpdatedCategory(product.category);
      setUpdatedImage(null);
      onOpen();
    };

    const handleUpdateSubmit = async () => {
      const formData = new FormData();
      formData.append('title', updatedTitle);
      formData.append('description', updatedDescription);
      formData.append('price', updatedPrice);
      
      formData.append('category', updatedCategory);
      if (updatedImage) {
        formData.append('image', updatedImage);
      }
  
      try {        
        const res = await axios.put(`http://localhost:3000/api/v1/product/admin/update/${selectedProduct._id}`, formData, {
          withCredentials:true,
          headers: {            
            'Content-Type': 'multipart/form-data',
          }
        });
        const updatedProduct = await res.data;
        setProducts(products.map((product) => (product._id === selectedProduct._id ? updatedProduct : product)));
        onClose();
        alert("Product updated Succesfully")
        
      } catch (error) {
        console.log(error);
      }
    };

    const handleImageChange = (e) => {
      setUpdatedImage(e.target.files[0]);
    };

  return (
    <>
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
                    {product.description}
                  </Text>

                  <Text color="blue.600" fontSize="">
                   INR {product.price}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="solid" colorScheme="blue" onClick={() => handleUpdate(product)}>
                    Update
                  </Button>
                  <Button variant="ghost" colorScheme="blue" onClick={() => handleDelete(product._id)}>
                    Delete
                  </Button>
                </ButtonGroup>
              </CardFooter>
              
            </Card>
            </div>


         ))}
       </main> 

       {selectedProduct && (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="bg-cyan-500 flex items-center">
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input value={updatedPrice} onChange={(e) => setUpdatedPrice(e.target.value)} />
            </FormControl>
            
            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Input value={updatedCategory} onChange={(e) => setUpdatedCategory(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input type="file" onChange={handleImageChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      )}
     </>
  );
};

export default AllProducts;
