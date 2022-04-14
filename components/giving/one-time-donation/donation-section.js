import React, { useState, useContext } from 'react'
import SectionHeading from '../../ui/section-heading'
import { NumberInput, Button, Group, Modal } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';
import { BsCreditCard2Front } from "react-icons/bs";
import { GiPayMoney } from 'react-icons/gi';
import OneTimeStripeCheckout from './one-time-stripe-checkout';
import { UserContext } from '../../../store/user-context';
import UIModal from '../../ui/modal/UIModal';
const DonationSection = () => {
    const userContext = useContext(UserContext);
    const [value, setValue] = useState(1);
    const [checkingOut, setCheckingOut] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const largeBreakpoint = useMediaQuery("(min-width: 450px)")
    const lgStyles = { input: { width: "20rem", height: "5rem", textAlign: 'center', border: "none", borderBottom: "2px solid gray", fontSize: "3rem", margin: "1rem", fontFamily: "Red Hat Display" } }
    const smStyles = {
      input: {
        width: "100%",
        height: "2rem",
        textAlign: "center",
        border: "none",
        borderBottom: "2px solid gray",
        fontSize: "2rem",
        margin: "1rem",
        fontFamily: "Red Hat Display",
      },
    };


    const toggleCheckout = () => {
        setCheckingOut(true);
    }


  return (
    <SectionHeading title="One Time Donation" subheading="Enter An Amount">
      <div className="flex flex-1 flex-col justify-center items-center mt-6 border-2 p-10 w-11/12 lg:w-3/6 md:w-4/6 mx-auto bg-white">
        <Modal
          centered
          opened={checkingOut}
          onClose={() => setCheckingOut(false)}
        >
          <OneTimeStripeCheckout
            setErrorMessage={setErrorMessage}
            amount={value}
            setSuccess={setSuccess}
            setCheckingOut={setCheckingOut}
            setError={setError}
          />
        </Modal>

        {!userContext.user && (
          <UIModal
            centerModal={true}
            type="success"
            opened={success}
            onClose={() => setSuccess(false)}
            message="Donation succeeded! Thank you so much for your contribution! Acts of kindess from people such as yourself are what allow our community to thrive and grow. A receipt for this transaction will be emailed to you automatically. If you did not receive this email, please contact us at {{EMAIL}} and we will send it again."
          />
        )}
        {userContext.user && (
          <UIModal
            centerModal={true}
            type="success"
            opened={success}
            onClose={() => setSuccess(false)}
            actionText={'View Transaction History'}
            href="/profile/transaction-history"
            message={`As always, thank you ${userContext.firstName}. You will receive an email containing a receipt for this transaction! You can also view and download your receipt by visiting your transaction history in your user profile`}
          />
        )}
        <UIModal
          centerModal={true}
          type="error"
          opened={error}
          onClose={() => setError(false)}
          message={`Your payment failed for the following reason: ${errorMessage}`}
        />
        <Group spacing={5}>
          <NumberInput
            hideControls
            value={value}
            onChange={(val) => setValue(val)}
            precision={2}
            min={1}
            step={1}
            styles={largeBreakpoint ? lgStyles : smStyles}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Group>
        <Button
          type="submit"
          variant="filled"
          leftIcon={<GiPayMoney size={20} />}
          onClick={toggleCheckout}
          className="text-white bg-emerald-900 hover:bg-emerald-800 mt-12"
        >
          Begin Checkout
        </Button>
      </div>
    </SectionHeading>
  );
}

export default DonationSection