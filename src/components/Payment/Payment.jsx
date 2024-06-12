import React from 'react'
import axios from 'axios'

const Payment = () => {

  const handlePayment = async(e) => {
    

    try {

      const response = await axios.post('http://localhost:3000/api/v1/payment/createorder', {
        amount: 500, // Example amount
        currency: 'INR',
        receipt: 'order_rcptid_11',
        notes: ['This is a test note']
      })

      const order = response.data;
      console.log(order)

     
      var options = {
        key: "rzp_test_1atTtIDZDACkqU",
        amount: order.amount, // Example amount (in currency subunits)
        currency: order.currency,
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, // Replace with your actual order ID

        handler: async function (response) {
          alert( response.razorpay_payment_id);
          alert( response.razorpay_order_id);
          alert( response.razorpay_signature);

          console.log(response)

        const paymentVerificationResponse = await axios.post(
          "http://localhost:3000/api/v1/payment/order/validate",
          {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
          }
        );

        console.log(paymentVerificationResponse);
      },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000"
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
      };

      console.log("Initializing Razorpay:", options);
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
      e.preventDefault();

    } catch (error) {
      console.error('Error initiating payment:', error);
    }

  }
  return (
    <div>
      <img src="" alt="" />
      <p></p>
      <p>Price</p>
      <button onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  )
}

export default Payment