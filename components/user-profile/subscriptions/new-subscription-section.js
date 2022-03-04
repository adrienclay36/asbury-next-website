import React, { useState, useEffect, useContext } from 'react'
import PlanCard from './plan-card'
import { Modal, Button, Select } from '@mantine/core';
import { BsCreditCard2Front } from 'react-icons/bs';
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
    const [success, setSuccess] = useState(false);

    const getPlans = async () => {
      setLoadingPlans(true);
      const response = await axios.get('/api/get-products');
      setPlans(response.data.prices);
      setPrices(response.data.costList);
      setLoadingPlans(false);
    }

    const checkoutSuccess = (subscriptionID) => {
      setCheckingOut(false);
      setSuccess(true);
      userContext.setNewSubscription(selectedPlan.unit_amount / 100, subscriptionID);
    }


    useEffect(() => {
      if(!userContext.user || userContext.recurringSubscription) {
        router.push("/profile/manage-subscription");
        return;
      }
      getPlans();
    },[userContext.user, userContext.recurringSubscription, router])

    if(loadingPlans) {
      return <SkeletonPost/>
    }
    const checkOutWithPlan = () => {
      if(selectedAmount){
        const chosenPlan = plans.find(plan => plan.unit_amount === parseInt(selectedAmount) * 100);
        setSelectedPlan(chosenPlan);
        setCheckingOut(true);
      }
      setSelectedAmount(null);
    }

    
  return (
    <>
      <Modal
        centered
        opened={checkingOut}
        onClose={() => setCheckingOut(false)}
      >
        <PlanCheckoutForm
          checkoutSuccess={checkoutSuccess}
          selectedPlan={selectedPlan}
        />
      </Modal>
      <UIModal
        centerModal={true}
        opened={success}
        onClose={() => setSuccess(false)}
        type="success"
        message={`Success! You're now subscribed to regular donations. You will be charged $${
          selectedPlan?.unit_amount / 100
        } today, and each month going forward until you cancel. Thank you for contributing to Asbury's mission! You can manage your new subscription in your user profile.`}
      />
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
            type="button"
            variant="filled"
            leftIcon={<BsCreditCard2Front size={20} />}
            className="text-white bg-emerald-900 hover:bg-emerald-800 w-full"
          >
            Select This Plan
          </Button>
        </div>
      </div>
    </>
  );
}

export default NewSubscriptionSection