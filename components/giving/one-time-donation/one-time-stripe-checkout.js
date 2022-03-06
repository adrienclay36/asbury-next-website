import React, { useState, useContext } from "react";
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button, Select, TextInput } from "@mantine/core";
import axios from "axios";
import { states } from "../../../states";
import { cities } from "../../../cities";
import { UserContext } from "../../../store/user-context";
import { BsCreditCard2Front } from "react-icons/bs";

const OneTimeStripeCheckout = ({ amount, setSuccess, setCheckingOut, setError, setErrorMessage }) => {
  const userContext = useContext(UserContext);
  const [formIncomplete, setFormIncomplete] = useState(true);
  const [name, setName] = useState(userContext.user ? `${userContext.firstName} ${userContext.lastName}` : '');
  const [email, setEmail] = useState(
    userContext.user
      ? userContext.user.email
      : ""
  );
  const [submitting, setSubmitting] = useState(false);
  const [address, setAddress] = useState({
    line1: "",
    postal_code: "",
  });
  const [city, setCity] = useState('');
  const [citiesData, setCitiesData] = useState(cities);
  const [state, setState] = useState();
  const elements = useElements();
  const stripe = useStripe();

  

  const handlePayment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    let customerID = '';
    if(userContext.customerID) {
      customerID = userContext.customerID;
    }
    const { data: clientSecret } = await axios.post("/api/payment-intents", {
      amount: amount * 100, // this is in cents
      email: email.toLowerCase(),
      customerID: customerID,
    });

    const billingDetails = {
      name,
      email,
      address: {
        city: city,
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
    if(paymentMethodReq.error) {
      setError(true);
      setCheckingOut(false);
      setSubmitting(false);
      if (paymentMethodReq.error.message) {
        setErrorMessage(paymentMethodReq.error.message);
      } else {
        setErrorMessage("Unknown Error");
      }

      return;
    }
    const confirmCardPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id,
      
    });
    if(confirmCardPayment.error) {
      setError(true);
      setCheckingOut(false);
      if (confirmCardPayment.error.message){
        setErrorMessage(confirmCardPayment.error.message);
      } else {
        setErrorMessage("Unknown Error");
      }
      
      
      return;
    }
    if(confirmCardPayment.paymentIntent.status === "succeeded") {
      setSubmitting(false);
      setCheckingOut(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setAddress({ city: "", line1: "", postal_code: "" });
      setState("");
    } else {
      
      setCheckingOut(false);
      setSubmitting(false);
      setSuccess(false);
    }
  };

  const cardInputHandler = (e) => {
    if(e.complete){
      setFormIncomplete(false);
    }
  }


  const cardElementOptions = {
    style: {
      base: {
        fontSize: "24px",
        "::placeholder": {
          color: "#566b69",
        },
      },
      invalid: {},
      complete: {},
    },
    hidePostalCode: true,
  };




  return (
    <form onSubmit={handlePayment}>
      <div>
        <p className="mb-4 text-center font-semibold">Customer Information</p>
        <p className="text-center font-semibold text-seaFoam-600">
          Donating ${amount}
        </p>
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
          <Select
            label="City"
            value={city}
            onChange={setCity}
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => setCitiesData((current) => [...current, query])}
            placeholder="Start Typing To Search"
            nothingFound
            required
            data={citiesData}
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
        <div className="mb-4">
          <TextInput
            label="Zip Code"
            value={address.postal_code}
            onChange={(e) =>
              setAddress({ ...address, postal_code: e.target.value })
            }
            required
            placeholder="87112"
          />
        </div>
        <div className="w-full">
          <CardElement onChange={cardInputHandler} options={cardElementOptions} />
        </div>
      </div>
      <div className="text-center w-11/12 lg:w-2/6 md:w-2/6 mx-auto mt-6">
        <Button
          type="submit"
          disabled={formIncomplete}
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
