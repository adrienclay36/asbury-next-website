import React, { useContext } from 'react'
import SectionHeading from '../ui/section-heading'
import { BsCreditCard2Front } from 'react-icons/bs';
import { GrTransaction } from 'react-icons/gr';
import { FaSlidersH, FaMapMarkedAlt } from 'react-icons/fa';
import { UserContext } from '../../store/user-context';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
const FinancialManagementSection = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();


  const createPortalSession = async () => {
      const response = await axios.post('/api/create-customer-portal-session', {customerID: userContext.customerID});
      router.push(response.data.sessionURL);
    }
  return (
    <SectionHeading title="Donations">
      <div className="flex flex-1 flex-col justify-center items-center border-2 p-6 rounded-md shadow-md w-11/12 lg:w-2/6 md:w-2/6 mx-auto">
        <h1 className="text-lg lg:text-2xl md:text-2xl font-semibold text-seaFoam-600 mb-6">
          Available Actions
        </h1>
        <ul className="text-center font-semibold grid sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-3 w-full gap-6">
          
            <div onClick={!userContext.recurringSubscription ? () => router.push('/profile/new-subscription') : createPortalSession} className="flex flex-1 justify-center items-center">
              <BsCreditCard2Front
                className="mr-2 cursor-pointer text-seaFoam-600"
                size={20}
              />
              <li className="hover:underline cursor-pointer">
                {userContext.recurringSubscription
                  ? "Manage Your Subscription"
                  : "Set Up Recurring Donations"}
              </li>
            </div>

            <Link href="/profile/transaction-history" passHref>
          <div className="flex flex-1 justify-center items-center">
            <GrTransaction
              className="mr-2 cursor-pointer text-seaFoam-600"
              size={20}
              />
            <li className="hover:underline cursor-pointer">
              View Your Transaction History
            </li>
          </div>
              </Link>
          {/* <div className="flex flex-1 justify-center items-center">
            <FaSlidersH
              className="mr-2 cursor-pointer text-seaFoam-600"
              size={20}
            />
            <li className="hover:underline cursor-pointer">
              View All Available Plans
            </li>
          </div>
          <div className="flex flex-1 justify-center items-center">
            <FaMapMarkedAlt
              className="mr-2 cursor-pointer text-seaFoam-600"
              size={20}
            />
            <li className="hover:underline cursor-pointer">
              View Your {new Date().getFullYear()} Roadmap
            </li>
          </div> */}
        </ul>
      </div>
    </SectionHeading>
  );
}

export default FinancialManagementSection