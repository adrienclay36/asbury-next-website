import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { TextInput } from "@mantine/core";
import axios from "axios";
const OneTimeStripeCheckout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    city: "",
    state: "",
    line1: "",
    postal_code: "",
  });
  const elements = useElements();
  const stripe = useStripe();


  const handlePayment = async (e) => {
    e.preventDefault();
    const { data:clientSecret} = await axios.post('/api/payment-intents', {
      amount: 100, // this is in cents
    });

    const billingDetails = {
      name,
      email,
      address: {
        city: address.city,
        line1: address.line1,
        state: address.state,
        postal_code: address.postal_code,
      }
    }

    const cardElement = elements.getElement(CardElement);

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: billingDetails,
      
    })

    const confirmCardPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id,
    })
    console.log(confirmCardPayment);
  }
  return (
    <form onSubmit={handlePayment}>
      <div className="w-11/12 lg:w-2/6 md:w-2/6 mx-auto p-10 border-2 mt-12">
        <div className="mb-4">
          <TextInput
            label="Name On Card"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
        </div>

        <div className="mb-4">
          <TextInput
            label="Address"
            value={address.line1}
            onChange={(e) => setAddress({ ...address, line1: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="State"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="w-11/12 mx-auto lg:w-2/6 md:w-2/6 p-10 border-2 mt-12 mb-4">
        <CardElement />
      </div>
      <div className="text-center">

      <button type="submit" className="px-4 py-2 text-white uppercase bg-seaFoam-600 rounded-lg">Donate</button>
      </div>
    </form>
  );
};

export default OneTimeStripeCheckout;
