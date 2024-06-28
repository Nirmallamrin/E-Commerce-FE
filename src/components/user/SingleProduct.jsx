import React, { useEffect, useState } from "react";
import {
  Card,
  Stack,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Image,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/CartActions";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    comment: "",
    rating: 0,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://e-commerce-be-yi97.onrender.com/product/products/${id}`
        );
        setProduct(res.data);
        setLoading(false);

        setReviews([
          { name: "John Doe", comment: "Great product!", rating: 4 },
          { name: "Jane Smith", comment: "Good value for money.", rating: 5 },
        ]);
        console.log(res.data);
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

  const handleAddToCart = () => {
    const token = sessionStorage.getItem("userToken");
    if (!token) {
      toast.error("You need to sign in first.");
      navigate("/users/signin");
      return;
    }
    dispatch(addToCart(product));
    toast.success("Product added to cart!");
  };

  const handleBuyNow = () => {
    const token = sessionStorage.getItem("userToken");
    console.log("Retrieved token:", token);
    if (!token) {
      toast.error("You need to sign in first.");
      navigate("/users/signin");
      
    }else {
      navigate("/order", { state: { product } });
    }
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviews([...reviews, newReview]);
    setNewReview({ name: '', comment: '', rating: 0 });
    toast.success("Review submitted!");
  }

  return (
    <>
      <div className="flex justify-center items-center p-4 bg-gray-100">
        <Card
          direction={{ base: "column", md: "row" }}
          overflow="hidden"
          variant="outline"
          className="w-full max-w-screen-lg rounded-lg shadow-lg bg-white"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", md: "350px" }}
            src={product.image.url}
            alt={product.title}
          />
          <Stack spacing={4} p={4} className="flex flex-col justify-between">
            <CardBody>
              <Heading size="md">{product.title}</Heading>

              <Text py="2" className="mt-2">
                {product.description}
              </Text>
              <Text py="2" className="flex items-center">
                <FaIndianRupeeSign className="mr-0" />
                {product.price}
              </Text>
              <span className="flex mt-3">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStar />
              </span>
            </CardBody>
            <CardFooter className=" flex gap-2 justify-center">
              <Button 
              variant="solid" 
              colorScheme="blue"
              onClick={handleBuyNow}>
                Buy Now
              </Button>
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={handleAddToCart}
                className="px-4 py-2"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </div>
      <div className="p-4">
        <h2 className="flex justify-center text-2xl font-semibold mb-4">
          Product Details
        </h2>
        <div className="flex justify-center">
          <ul className="list-disc list-inside text-center text-gray-700">
            <li className="mt-1">Lorem ipsum</li>
            <li className="mt-1">Lorem ipsum</li>
            <li className="mt-1">Lorem ipsum</li>
            <li className="mt-1">Lorem ipsum</li>
            <li className="mt-1">Lorem ipsum</li>
            <li className="mt-1">Lorem ipsum</li>
          </ul>
        </div>
        <p className=" mt-4 container mx-auto text-center text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          ratione accusamus omnis iste facere? Corporis, earum cupiditate
          quaerat amet laborum, doloremque nostrum similique provident officia
          incidunt repudiandae aliquam temporibus debitis. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Voluptas ratione accusamus omnis
          iste facere? Corporis, earum cupiditate quaerat amet laborum,
          doloremque nostrum similique provident officia incidunt repudiandae
          aliquam temporibus debitis.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          ratione accusamus omnis iste facere? Corporis, earum cupiditate
          quaerat amet laborum, doloremque nostrum similique provident officia
          incidunt repudiandae aliquam temporibus debitis. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Voluptas ratione accusamus omnis
          iste facere? Corporis, earum cupiditate quaerat amet laborum,
          doloremque nostrum similique provident officia incidunt repudiandae
          aliquam temporibus debitis.
        </p>
      </div>
      <div className ="flex flex-col items-center m-7">
        <h2 className ="text-2xl">Riview the Product</h2>
        <form onSubmit={handleReviewSubmit} className="mt-4">
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
              required
            />
          </FormControl>
          <FormControl id="rating" className="mt-4">
            <FormLabel>Rating</FormLabel>
            <Input
              type="number"
              min="1"
              max="5"
              
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: e.target.value })
              }
              required
            />
          </FormControl>
          <FormControl id="comment" className="mt-4">
            <FormLabel>Comment</FormLabel>
            <Textarea
              value={newReview.comment}
              className="border rounded-md p-2"
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" className="mt-4">
            Submit Review
          </Button>
        </form>
        <div className="mt-4">
          <Heading size="md">Reviews</Heading>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="mt-4">
                <Text fontWeight="bold">{review.name}</Text>
                <Text>{"⭐".repeat(review.rating)}</Text>
                <Text>{review.comment}</Text>
              </div>
            ))
          ) : (
            <Text>No reviews yet</Text>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleProduct;