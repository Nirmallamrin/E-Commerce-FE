import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderDetails } = location.state || {};

  useEffect(() => {
    if (!orderDetails) {
      // Redirect to an error page or back to the orders page if orderDetails is not available
      navigate('/order/ordesss');
    }
  }, [orderDetails, navigate]);

  const handlePayment = async () => {
    if (!orderDetails) {
      console.error('Order details not found.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/payment/createorder',
        {
          amount: orderDetails.totalPrice * 100,
          currency: 'INR',
          receipt: `order_rcptid_${orderDetails._id}`,
          notes: ['This is a test note'],
        }
      );

      const order = response.data;
      console.log(order);

      var options = {
        key: import.meta.env.RAZORPAY_KEY_ID,
        amount: order.amount, // Example amount (in currency subunits)
        currency: order.currency,
        name: 'Shopy',
        description: 'Payment for Order ID: ' + orderDetails._id,
        image: 'https://example.com/your_logo',
        order_id: order.id, // Replace with your actual order ID

        // handler: async function (response) {
        //   alert(response.razorpay_payment_id);
        //   alert(response.razorpay_order_id);
        //   alert(response.razorpay_signature);
        //   navigate("/success")         
        //   console.log(response);

        handler: async function (response) {
          console.log(response);

          const paymentVerificationResponse = await axios.post(
            'http://localhost:3000/api/v1/payment/order/validate',
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          if (paymentVerificationResponse.status === 200){
            navigate("/success", {
              state: {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
              },
            })
          }else {
            console.error('Payment verification failed.');
          }
        },
        prefill: {
          name: orderDetails.shippingAddress.name,
          email: orderDetails.shippingAddress.email,
          contact: orderDetails.shippingAddress.phonenumber,
        },
        notes: {
          address: orderDetails.shippingAddress.address,
        },
        theme: {
          color: '#3399cc',
        },
      };

      console.log('Initializing Razorpay:', options);
      // Initialize Razorpay instance
      var rzp1 = new window.Razorpay(options);

      // Handle payment failure event
      rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      // Open Razorpay payment form
      rzp1.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h2 className='text-2xl font-semibold mb-4'>Payment Details</h2>
      <div className='p-4'>
      <h3>Order ID: {orderDetails._id}</h3>
        <div>
          <h3>Delivery Address</h3>
          <ul>
            <li>
              {orderDetails.shippingAddress.address},
            </li>
            <li>
              {orderDetails.shippingAddress.city},
            </li>
            <li>
              {orderDetails.shippingAddress.pincode},
            </li>
            <li>
              {orderDetails.shippingAddress.country}.
            </li>
            <li>
              PhoneNO:{orderDetails.shippingAddress.phonenumber}
            </li>
            <li>
              Email:{orderDetails.shippingAddress.email}
            </li>
          </ul>
        </div>
        <div className="">
            <span>Delivery Charges</span>
            <span>₹0 (Free)</span>
          </div>
        <h3>Total Price: ₹{orderDetails.totalPrice}</h3>
        <button onClick={handlePayment}>Pay with Razorpay</button>
      </div>
    </div>
  );
};

export default Payment;
