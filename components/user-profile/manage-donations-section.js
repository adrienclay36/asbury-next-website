import React from 'react'
import SectionHeading from '../ui/section-heading'
import { BsCreditCard2Front } from 'react-icons/bs';
import { BiHistory } from 'react-icons/gr';
const ManageDonationsSection = () => {
  return (
    <SectionHeading title="Donations" >
      <div className="flex flex-1 flex-col justify-center items-center border-2 p-6 rounded-md shadow-md w-11/12 lg:w-2/6 md:w-2/6 mx-auto">
        <h1 className="text-lg lg:text-2xl md:text-2xl font-semibold text-seaFoam-600 mb-6">Available Actions</h1>
        <ul className="text-center font-semibold grid sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-3 w-full gap-6">
          <div className="flex flex-1 justify-center items-center">
            <BsCreditCard2Front className="mr-2 cursor-pointer text-seaFoam-600" size={20}/>
          <li className="hover:underline cursor-pointer">Set Up Recurring Donations</li>
          </div>
          <div className="flex flex-1 justify-center items-center">
            <BiHistory className="mr-2 cursor-pointer text-seaFoam-600" size={20}/>
          <li className="hover:underline cursor-pointer">View Your Transaction History</li>
          </div>
          <li className="hover:underline cursor-pointer">View All Available Plans</li>
          <li className="hover:underline cursor-pointer">View All Available Plans</li>
        </ul>
      </div>
    </SectionHeading>
  )
}

export default ManageDonationsSection