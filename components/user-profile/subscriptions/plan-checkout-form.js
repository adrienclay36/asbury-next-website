import React, { useContext, useState, useEffect } from "react";
import { TextInput, Button, Select, NumberInput } from "@mantine/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { BsCreditCard2Front } from "react-icons/bs";
import { UserContext } from "../../../store/user-context";
import { cities } from "../../../cities";
import { states } from "../../../states";
import axios from "axios";
const PlanCheckoutForm = ({ selectedPlan, checkoutSuccess }) => {
  const userContext = useContext(UserContext);
  const [formIncomplete, setFormIncomplete] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [name, setName] = useState(
    userContext.user ? `${userContext.firstName} ${userContext.lastName}` : ""
  );
  const [email, setEmail] = useState(
    userContext.user ? userContext.user.email : ""
  );
  const [address, setAddress] = useState({
    line1: "",
    postal_code: "",
  });
  const [city, setCity] = useState("");
  const [citiesData, setCitiesData] = useState(cities);
  const [state, setState] = useState();
  const elements = useElements();
  const stripe = useStripe();

  const cardInputHandler = (e) => {
    if (e.complete) {
      setFormIncomplete(false);
    }
  };

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

  /* SUBSCRIPTION CREATION LOGIC */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setSubmitting(true);
    if (
      !email ||
      !address.line1 ||
      !address.postal_code ||
      !state ||
      !city ||
      formIncomplete
    ) {
      setSubmitting(false);
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        address: {
          city: city,
          line1: address.line1,
          postal_code: address.postal_code,
          state: state,
        },
        email: userContext.user.email,
        name: name,
        phone: phoneNumber.toString(),
      },
    });

    await handleStripePaymentMethod(result);
  };

  const handleStripePaymentMethod = async (result) => {
    if (result.error) {
      console.log(result.error);
      setSubmitting(false);
    } else {
      const response = await axios.post("/api/create-customer", {
        paymentMethodId: result.paymentMethod.id,
        email: email,
        name: name,
        phone: phoneNumber.toString(),
        price: selectedPlan.id,
      });
      handleSubscription(response.data, result.paymentMethod.id);
    }
  };

  const handleSubscription = async (subscription, paymentMethodId) => {
    const { latest_invoice } = subscription;
    const { payment_intent } = latest_invoice;
    
    if (payment_intent) {
      const { client_secret, status, customer } = payment_intent;


      if (status === "requires_action") {
        const confirmCardPayment = await stripe.confirmCardPayment(
          client_secret,
          { payment_method: paymentMethodId }
        );
        if (confirmCardPayment.paymentIntent.status === "succeeded") {
          setSubmitting(false);
          setSuccess(true);
          console.log(confirmCardPayment);
        } else {
          setSuccess(false);
          setSubmitting(false);
        }
      } else {
        setSuccess(true);
        setSubmitting(false);
        
        checkoutSuccess(subscription.id);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="text-center font-semibold mb-4">
          <p>Setting Up Monthly Donations For:</p>
          <p className="text-seaFoam-600 text-xl">
            ${selectedPlan.unit_amount / 100}
          </p>
        </div>
        <p className="text-center font-semibold">Customer Information</p>
        <p className="text-center text-xs mb-">
          (We do not store your credit card information)
        </p>
        <p className="text-center font-semibold text-seaFoam-600"></p>
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
          <NumberInput
            label="Phone Number"
            value={phoneNumber}
            onChange={setPhoneNumber}
            hideControls
            required
            placeholder="Enter A Valid Phone Number"
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
            onCreate={(query) =>
              setCitiesData((current) => [...current, query])
            }
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
          <CardElement
            onChange={cardInputHandler}
            options={cardElementOptions}
          />
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

export default PlanCheckoutForm;
