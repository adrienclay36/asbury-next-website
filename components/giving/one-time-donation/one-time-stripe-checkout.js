import React, { useState } from "react";
import {
  CardElement,
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button, Select, TextInput } from "@mantine/core";
import axios from "axios";
import { states } from "../../../states";
import { BsCreditCard2Front } from 'react-icons/bs';

const OneTimeStripeCheckout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [address, setAddress] = useState({
    city: "",
    line1: "",
    postal_code: "",
  });
  const [state, setState] = useState();
  const elements = useElements();
  const stripe = useStripe();

  const handlePayment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { data: clientSecret } = await axios.post("/api/payment-intents", {
      amount: 100, // this is in cents
    });

    const billingDetails = {
      name,
      email,
      address: {
        city: address.city,
        line1: address.line1,
        state: state,
        postal_code: address.postal_code,
      },
    };

    const cardElement = elements.getElement(CardElement);

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: billingDetails,
    });

    const confirmCardPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id,
    });
    setSubmitting(false);
    setName('');
    setEmail('');
    setAddress({city: '', line1: '', postal_code: ''});
    setState('');
  };
  return (
    <form onSubmit={handlePayment}>
      <div className="container w-11/12 lg:w-3/12 md:w-3/12 mx-auto p-10 border-2 mt-12 rounded-lg bg-white">
        <div className="mb-4">Customer Information</div>
        <div className="mb-4">
          <TextInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Full Name"
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Enter Your Email"
          />
        </div>

        <div className="mb-4">
          <TextInput
            label="Address"
            value={address.line1}
            onChange={(e) => setAddress({ ...address, line1: e.target.value })}
            required
            placeholder="1234 First St. NE"
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            required
            placeholder="Albuquerque"
          />
        </div>
        <div className="mb-4">
          <Select
            label="State"
            value={state}
            onChange={setState}
            data={states}
            searchable
            placeholder="Start Typing to Search"
            required
            nothingFound="No State With That Name.."
            dropdownPosition="bottom"
            clearable
          />
        </div>
      <div className="w-full">
        <CardElement />
      </div>
      </div>
      <div className="text-center w-11/12 lg:w-2/6 md:w-2/6 mx-auto">
        <Button
          type="submit"
          loading={submitting}
          variant="filled"
          leftIcon={<BsCreditCard2Front size={20} />}
          className="text-white bg-emerald-900 hover:bg-emerald-800 w-full"
        >
          
          Donate
        </Button>
      </div>
    </form>
  );
};

export default OneTimeStripeCheckout;
