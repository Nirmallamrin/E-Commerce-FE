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
        'https://e-commerce-be-yi97.onrender.com/payment/createorder',
        {
          amount: orderDetails.totalPrice,
          currency: 'INR',
          receipt: `order_rcptid_${orderDetails._id}`,
          notes: ['This is a test note'],
        }
      );

      const order = response.data;
      console.log(order);

      var options = {
        key: "rzp_test_L6wBhNL2VYpuYf",
        amount: order.amount, // Example amount (in currency subunits)
        currency: order.currency,
        name: 'Shopy',
        description: 'Payment for Order ID: ' + orderDetails._id,
        image: 'https://example.com/your_logo',
        order_id: order.id, 



        handler: async function (response) {
          console.log(response);

          const paymentVerificationResponse = await axios.post(
            'https://e-commerce-be-yi97.onrender.com/payment/order/validate',
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
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
      <div className="p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-screen-lg">
        <h3 className="text-xl font-semibold">Order ID: {orderDetails._id}</h3>
        <div>
          <h3 className="text-lg font-semibold mt-2">Delivery Address</h3>
          <ul className="list-disc pl-4">
            <li>{orderDetails.shippingAddress.address},</li>
            <li>{orderDetails.shippingAddress.city},</li>
            <li>{orderDetails.shippingAddress.pincode},</li>
            <li>{orderDetails.shippingAddress.country}.</li>
            <li>PhoneNO:{orderDetails.shippingAddress.phonenumber}</li>
            <li>Email:{orderDetails.shippingAddress.email}</li>
          </ul>
        </div>
        <div className="flex justify-between border-t border-gray-300 pt-4">
          <span className='text-lg font-semibold'>Delivery Charges</span>
          <span className='text-lg font-semibold'>₹0 (Free)</span>
        </div>
        <h3 className='text-2xl font-semibold mt-4'>Total Price: ₹{orderDetails.totalPrice}</h3>
        <button onClick={handlePayment}
        className='mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
          Pay with Razorpay</button>
      </div>
    </div>
  );
};

export default Payment;
