import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai';
const CheckoutSuccess = () => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center w-screen h-screen">
      <AiOutlineCheckCircle size={100} className="text-green-600" />
      <p className="my-4 font-bold text-xl text-center">Checkout Successful!</p>
      <p className="font-semibold text-xl text-center">Thank you for your donation!</p>
      <p className="font-semibold text-xl text-center">A record for this transaction will appear in your app shortly.</p>
    </div>
  );
}

export default CheckoutSuccess