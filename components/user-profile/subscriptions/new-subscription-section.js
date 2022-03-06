import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button, Select } from '@mantine/core';
import { GiPayMoney } from 'react-icons/gi';
import HRThin from '../../ui/HRThin';
import PlanCheckoutForm from './plan-checkout-form';
import axios from 'axios';
import SkeletonPost from '../../ui/skeleton-post';
import UIModal from '../../ui/modal/UIModal';
import { UserContext } from '../../../store/user-context';
import { useRouter } from 'next/router';
const NewSubscriptionSection = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
    const [plans, setPlans] = useState([]);
    const [prices, setPrices] = useState([]);
    const [loadingPlans, setLoadingPlans] = useState(false);
    const [checkingOut, setCheckingOut] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState('');
    const [selectedPlan, setSelectedPlan] = useState();
    const [products, setProducts] = useState();
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const getPlans = async () => {
      setLoadingPlans(true);
      const response = await axios.get('/api/get-products');
      setPlans(response.data.prices);
      setProducts(response.data.products);
      setPrices(response.data.namesOnly);
      setLoadingPlans(false);
    }

    const checkoutSuccess = (customerID) => {
      setCheckingOut(false);
      setSuccess(true);
      userContext.setNewSubscription(customerID);
    }


    useEffect(() => {
      if(!userContext.user || userContext.recurringSubscription) {
        const timeout = setTimeout(() => {
          router.push(`/profile/${userContext.firstName.toLowerCase()}-${userContext.lastName.toLowerCase()}`);
        }, 3000)
        return () => clearTimeout(timeout);
      }
      getPlans();
    },[userContext.user, userContext.recurringSubscription, router, userContext.firstName, userContext.lastName])

    if(loadingPlans) {
      return (
        <div className="w-11/12 mx-auto">
          <SkeletonPost />
        </div>
      );
    }
    const checkOutWithPlan = async () => {
      setSubmitting(true);
      if(selectedAmount){
        const chosenProduct = products.find(product => product.name === selectedAmount);
        const chosenPrice = plans.find(plan => plan.product === chosenProduct.id);
        setSelectedPlan(chosenPrice);

        const response = await axios.post('/api/create-checkout-session', {priceID: chosenPrice.id, userID: userContext.user.id});
        if(response.data.sessionURL) {
          router.push(response.data.sessionURL);
        }
        
      }
      setSubmitting(false);
      setSelectedAmount(null);
    }

    
  return (
    <>
      <div className="flex flex-1 flex-col justify-center items-center border-2 shadow-md rounded-lg p-4 w-11/12 lg:w-2/6 md:w-2/6 mx-auto">
        <p className="text-lg lg:text-2xl md:text-2xl uppercase text-seaFoam-600">
          Set Up A Monthly Contribution
        </p>
        <HRThin />
        <ul className="text-center font-semibold">
          <li className="mb-4 text-lg md:text-2xl lg:text-2xl">
            <Select
              dropdownPosition="bottom"
              styles={{
                item: {
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: 500,
                  fontFamily: "Red Hat Display",
                },
                input: {
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: 500,
                  fontFamily: "Red Hat Display",
                },
              }}
              value={selectedAmount}
              onChange={setSelectedAmount}
              label={"Amount"}
              data={prices}
            />
          </li>
          <li className="mb-4 text-gray-500">USD Monthly</li>
          <li className="mb-4 text-gray-500">
            Your Donations Help Asbury Keep It&apos;s Mission Alive
          </li>
        </ul>
        <div className="text-center w-11/12 lg:w-full md:w-full mx-auto mt-6">
          <Button
            onClick={checkOutWithPlan}
            loading={submitting}
            type="button"
            variant="filled"
            leftIcon={<GiPayMoney size={20} />}
            className="text-white bg-emerald-900 hover:bg-emerald-800 w-full"
          >
            Begin Checkout
          </Button>
        </div>
      </div>
    </>
  );
}

export default NewSubscriptionSection