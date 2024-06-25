import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Heading, Text, Stack, Button } from '@chakra-ui/react';
import { toast } from 'react-toastify';


const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = sessionStorage.getItem('userToken');
                if(!token) {
                    toast.error('You need to sign in first.');
                    navigate('/users/signin');
                    return;
                }

                const res = await axios.get("https://e-commerce-be-yi97.onrender.com/order/myorders/me")
                setOrders(res.data)
            } catch (error) {
                console.error('Error fetching orders:', error);
                toast.error('An error occurred while fetching orders.');
            }
        };
        fetchOrders();
    }, [navigate]);

    return (

        <div className="p-4">
        <Heading as="h2" size="xl" mb={4}>
          Your Orders
        </Heading>
        {orders.length === 0 ? (
          <Text>No orders found.</Text>
        ) : (
          orders.map((order) => (
            <Card key={order._id} className="mb-4">
              <CardBody>
                <Stack spacing={4}>
                  <Heading size="md">Order ID: {order._id}</Heading>
                  <Text>Date: {new Date(order.createdAt).toLocaleDateString()}</Text>
                  <Text>Status: {order.status}</Text>
                  <Text>Total Price: ₹{order.totalPrice}</Text>
                  <Heading size="sm">Items:</Heading>
                  {order.orderItems.map((item) => (
                    <Text key={item.product}>
                      {item.title} - ₹{item.price} x {item.quantity}
                    </Text>
                  ))}
                </Stack>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    )
}

export default UserOrders

